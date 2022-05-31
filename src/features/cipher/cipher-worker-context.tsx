import { releaseProxy, Remote, RemoteObject, wrap } from "comlink";
import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { throttle } from "../../lib/throttle";
import { CipherWorker } from "./cipher-comlink";
import { CipherKind, CipherOutputKind } from "./types";

export type CipherClient = Remote<CipherWorker>;

interface CipherWorkerState {
  rawWorker: Worker;
  worker: CipherClient;
}

type ContextState = MutableRefObject<CipherWorkerState | undefined>;

const CipherWorkerContext = React.createContext<ContextState | undefined>(
  undefined
);

interface CipherWorkerProviderProps {
  children: React.ReactNode;
}

function allocateWorker() {
  const raw = new Worker(new URL("./cipher-comlink.ts", import.meta.url));
  const proxy = wrap<CipherWorker>(raw);

  return {
    rawWorker: raw,
    worker: proxy,
  };
}

export const CipherWorkerProvider = ({
  children,
}: CipherWorkerProviderProps) => {
  const worker = useRef<CipherWorkerState>();

  useEffect(() => {
    if (worker.current === undefined && globalThis?.Worker !== undefined) {
      worker.current = allocateWorker();
    }

    return () => {
      if (worker.current) {
        worker.current.worker[releaseProxy]();
        worker.current.rawWorker.terminate();
        worker.current = undefined;
      }
    };
  }, []);

  return (
    <CipherWorkerContext.Provider value={worker}>
      {children}
    </CipherWorkerContext.Provider>
  );
};

function useCipherWorkerContext() {
  const context = useContext(CipherWorkerContext);

  if (context === undefined) {
    throw new Error("expected cipher worker context to be defined");
  }

  return context;
}

function useGetWorker() {
  const context = useCipherWorkerContext();

  return useCallback(() => {
    if (context.current?.worker === undefined) {
      throw new Error("expected cipher worker to be defined");
    }

    return context.current.worker;
  }, [context]);
}

export const useCipherWorker = () => {
  const getWorker = useGetWorker();

  const worker = useMemo(
    () => ({
      encrypt: (...args: Parameters<RemoteObject<CipherWorker>["encrypt"]>) =>
        getWorker().encrypt(...args),
      decrypt: (...args: Parameters<RemoteObject<CipherWorker>["decrypt"]>) =>
        getWorker().decrypt(...args),
      recoverVigenere: (
        ...args: Parameters<RemoteObject<CipherWorker>["recoverVigenere"]>
      ) => getWorker().recoverVigenere(...args),
    }),
    [getWorker]
  );

  const calculateOutput = useMemo(
    () =>
      throttle(
        async (mode: CipherKind, cb: (output: CipherOutputKind) => void) => {
          switch (mode.kind) {
            case "Decryption":
            case "Encryption": {
              if (!mode.cipherKey || !mode.input) {
                return;
              }

              const fn =
                mode.kind === "Decryption" ? worker.decrypt : worker.encrypt;
              const text = await fn(mode.input, mode.cipherKey);

              cb({ kind: mode.kind, text });
              return;
            }

            case "Frequency Analysis": {
              if (!mode.maxKeyLen || !mode.input) {
                return;
              }

              const out = await worker.recoverVigenere(
                mode.input,
                mode.maxKeyLen
              );

              cb({
                kind: mode.kind,
                derivedKey: out.key,
                text: out.plainText,
              });
            }
          }
        },
        200
      ),
    [worker]
  );

  return useMemo(
    () => ({
      worker,
      calculateOutput,
    }),
    [worker, calculateOutput]
  );
};

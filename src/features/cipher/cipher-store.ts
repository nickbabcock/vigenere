import { CipherKind, CipherOutputKind, Crypt } from "./types";
import { create } from "zustand";
import { getWorker } from "./cipher-worker";
import { queue } from "../../lib/queue";
import { CipherWorker } from "./cipher-comlink";

type CipherState = CipherKind & {
  autoFocusMode: Crypt["kind"] | "none";
  output?: CipherOutputKind;
  actions: {
    calcOutput: () => Promise<void>,
    newMode: (mode: Crypt["kind"]) => void,
    newInput: (input: string) => void,
    newKey: (key: string) => void,
    newMaxKey: (maxKeyLen: number) => void,
  }
};

const encryptionQueue = queue({
  work: (...args: Parameters<CipherWorker["encrypt"]>) =>
    getWorker().encrypt(...args),
});
const decryptionQueue = queue({
  work: (...args: Parameters<CipherWorker["decrypt"]>) =>
    getWorker().decrypt(...args),
});
const recoverQueue = queue({
  work: (...args: Parameters<CipherWorker["recoverVigenere"]>) =>
    getWorker().recoverVigenere(...args),
});

export const useCipherStore = create<CipherState>()((set, get) => ({
  kind: "Encryption",
  cipherKey: "",
  autoFocusMode: "none",
  actions: {
    calcOutput: async () => {
      if (!get().input) {
        return;
      }

      switch (get().kind) {
        case "Encryption": {
          const result = await encryptionQueue.run(
            get().input ?? "",
            get().cipherKey ?? "",
          );
          if (result.kind === "success") {
            set({ output: { kind: "Encryption", text: result.data } });
          }
          break;
        }
        case "Decryption": {
          const result = await decryptionQueue.run(
            get().input ?? "",
            get().cipherKey ?? "",
          );
          if (result.kind === "success") {
            set({ output: { kind: "Decryption", text: result.data } });
          }
          break;
        }
        case "Frequency Analysis": {
          const result = await recoverQueue.run(
            get().input ?? "",
            get().maxKeyLen ?? 10,
          );
          if (result.kind === "success") {
            set({
              output: {
                kind: "Frequency Analysis",
                derivedKey: result.data.key,
                text: result.data.plainText,
              },
            });
          }
          break;
        }
      }
    },


    newMode: (mode: Crypt["kind"]) => {
      set({
        kind: mode,
        autoFocusMode: mode,
      })
      get().actions.calcOutput()
    },

    newInput: async (input: string) => {
      set(() => ({ input }));
      get().actions.calcOutput()
    },

    newKey: (key: string) => {
      set(() => ({ cipherKey: key }));
      get().actions.calcOutput()
    },

    newMaxKey: (maxKeyLen: number) => {
      set(() => ({ maxKeyLen }));
      get().actions.calcOutput()
    },
  },
}));

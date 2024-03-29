import React, { useState } from "react";
import { useEffect, useId, useRef } from "react";
import { Card } from "../../components/Card";
import { useCipherReducer } from "./cipher-store";
import { useCipherWorker } from "./cipher-worker-context";
import { CipherOutput } from "./CipherOutput";
import classes from "./CipherApp.module.css";

export const CipherApp = () => {
  const { calculateOutput } = useCipherWorker();
  const [state, dispatch] = useCipherReducer();
  const [modeChanges, setModeChanges] = useState(0);

  const id = useId();
  const encryptionInputRef = useRef<HTMLInputElement>(null);
  const decryptionInputRef = useRef<HTMLInputElement>(null);
  const freqInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    calculateOutput(state.mode, (output) =>
      dispatch({ kind: "new-output", output }),
    );
  }, [state.mode, calculateOutput, dispatch]);

  // When the mode changes, focus the input field within
  useEffect(() => {
    if (modeChanges <= 0) {
      return;
    }

    switch (state.mode.kind) {
      case "Encryption": {
        encryptionInputRef.current?.focus();
      }

      case "Decryption": {
        decryptionInputRef.current?.focus();
      }

      case "Frequency Analysis": {
        freqInputRef.current?.focus();
      }
    }
  }, [modeChanges, state.mode.kind]);

  const mode = state.mode.kind;

  return (
    <>
      <div className="my-4">
        <div className="mx-auto mb-4 max-w-prose">
          <h2 className="text-lg">
            Selected cryptographic mode: {mode.toLocaleLowerCase()}
          </h2>
        </div>
        <div className="align-center mx-auto flex w-fit grid-cols-3 flex-col gap-3 lg:grid">
          <Card
            title="Encryption"
            selected={mode === "Encryption"}
            ariaLabel="Select encryption mode"
            onClick={() => {
              dispatch({ kind: "new-mode", mode: "Encryption" });
              setModeChanges((x) => x + 1);
            }}
          >
            <p className="color-2 grow text-left">
              Substitute letters of the input by shifting them to the right by
              the index of the next letter in the cipher key appears in the
              alphabet.
            </p>
            <div className="align-center grid w-full grid-cols-2">
              <label htmlFor={`${id}-enc`} className="block font-semibold">
                Cipher Key:
              </label>
              <input
                name="encryption-cipher-key"
                ref={encryptionInputRef}
                disabled={mode !== "Encryption"}
                id={`${id}-enc`}
                className="w-full rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                value={mode === "Encryption" ? state.mode.cipherKey : ""}
                onChange={(e) => {
                  dispatch({ kind: "new-key", key: e.target.value });
                }}
                spellCheck="false"
              />
            </div>
          </Card>

          <Card
            title="Decryption"
            selected={mode === "Decryption"}
            ariaLabel="Select decryption mode"
            onClick={() => {
              dispatch({ kind: "new-mode", mode: "Decryption" });
              setModeChanges((x) => x + 1);
            }}
          >
            <p className="color-2 grow text-left">
              Reverses encryption by shifting input letters to the left to
              recover the plaintext.
            </p>
            <div className="align-center grid w-full grid-cols-2">
              <label htmlFor={`${id}-dec`} className="block font-semibold">
                Cipher Key:
              </label>
              <input
                name="decryption-cipher-key"
                ref={decryptionInputRef}
                disabled={mode !== "Decryption"}
                id={`${id}-dec`}
                className="w-full rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                value={mode === "Decryption" ? state.mode.cipherKey : ""}
                onChange={(e) => {
                  dispatch({ kind: "new-key", key: e.target.value });
                }}
                spellCheck="false"
              />
            </div>
          </Card>

          <Card
            title="Frequency Analysis"
            ariaLabel="Select frequency analysis mode"
            selected={mode === "Frequency Analysis"}
            onClick={() => {
              dispatch({ kind: "new-mode", mode: "Frequency Analysis" });
              setModeChanges((x) => x + 1);
            }}
          >
            <p className="color-2 grow text-left">
              Attempts to recover the cipher key of up to a given length that
              outputs plaintext with letters that occur at the same frequency as
              English text.
            </p>
            <div className="align-center grid w-full grid-cols-2">
              <label htmlFor={`${id}-freq`} className="block font-semibold">
                Max Key Length:
              </label>
              <input
                ref={freqInputRef}
                name="max-key-length"
                disabled={mode !== "Frequency Analysis"}
                id={`${id}-freq`}
                className="w-24 rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                type="number"
                min="1"
                max="100"
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    dispatch({
                      kind: "new-max-key",
                      maxKeyLen: +e.target.value,
                    });
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="full-bleed grid grow grid-rows-2 gap-3 lg:grid-cols-2 lg:grid-rows-none">
        <div className="flex flex-col">
          <h3 className="text-lg">
            <label htmlFor={`${id}-input`}>Input</label>
          </h3>
          <textarea
            id={`${id}-input`}
            name="input"
            value={state.mode.input}
            className={`${classes["cipher-input"]} min-h-12 h-full w-full border-2 border-gray-200 p-1 dark:border-gray-600`}
            onChange={(e) =>
              dispatch({ kind: "new-input", input: e.target.value })
            }
            spellCheck="false"
          />
        </div>
        <div className="flex flex-col" data-test-id="output">
          <CipherOutput output={state.output} />
        </div>
      </div>
    </>
  );
};

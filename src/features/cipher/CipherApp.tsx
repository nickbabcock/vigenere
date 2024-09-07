import React, { useId } from "react";
import { Card } from "../../components/Card";
import { CipherOutput } from "./CipherOutput";
import classes from "./CipherApp.module.css";
import { useCipherStore } from "./cipher-store";

export const CipherApp = () => {
  const state = useCipherStore();

  const id = useId();
  const mode = state.kind;

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
            onClick={() => state.actions.newMode("Encryption")}
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
                key={mode}
                autoFocus={state.autoFocusMode === "Encryption"}
                disabled={mode !== "Encryption"}
                id={`${id}-enc`}
                className="w-full rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                value={mode === "Encryption" ? state.cipherKey : ""}
                onChange={(e) => state.actions.newKey(e.target.value)}
                spellCheck="false"
              />
            </div>
          </Card>

          <Card
            title="Decryption"
            selected={mode === "Decryption"}
            ariaLabel="Select decryption mode"
            onClick={() => state.actions.newMode("Decryption")}
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
                key={mode}
                autoFocus={state.autoFocusMode === "Decryption"}
                disabled={mode !== "Decryption"}
                id={`${id}-dec`}
                className="w-full rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                value={mode === "Decryption" ? state.cipherKey : ""}
                onChange={(e) => state.actions.newKey(e.target.value)}
                spellCheck="false"
              />
            </div>
          </Card>

          <Card
            title="Frequency Analysis"
            ariaLabel="Select frequency analysis mode"
            selected={mode === "Frequency Analysis"}
            onClick={() => state.actions.newMode("Frequency Analysis")}
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
                name="max-key-length"
                key={mode}
                autoFocus={state.autoFocusMode === "Frequency Analysis"}
                disabled={mode !== "Frequency Analysis"}
                id={`${id}-freq`}
                className="w-24 rounded border-2 border-gray-200 p-1 dark:border-gray-600"
                type="number"
                required={mode === "Frequency Analysis"}
                min="1"
                max="100"
                value={state.maxKeyLen}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    state.actions.newMaxKey(e.target.valueAsNumber)
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
            value={state.input}
            className={`${classes["cipher-input"]} h-full min-h-12 w-full border-2 border-gray-200 p-1 dark:border-gray-600`}
            onChange={(e) => state.actions.newInput(e.target.value)}
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

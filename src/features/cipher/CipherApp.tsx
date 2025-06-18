import React, { useCallback, useId } from "react";
import { Card } from "../../components/Card";
import { CipherOutput } from "./CipherOutput";
import classes from "./CipherApp.module.css";
import { useCipherStore } from "./cipher-store";
import { CipherKind } from "./types";

function CryptCard({
  kind,
  children,
}: React.PropsWithChildren<{ kind: CipherKind["kind"] }>) {
  const id = useId();
  const dispatch = useCipherStore((x) => x.actions);
  const mode = useCipherStore((x) => x.kind);
  const autoFocus = useCipherStore((x) => x.autoFocusMode);

  const encryptionRef = useCallback(
    (ref: HTMLInputElement | null) => {
      if (autoFocus === kind) {
        ref?.focus();
      }
    },
    [autoFocus, kind],
  );

  return (
    <Card
      title={kind}
      selected={mode === kind}
      ariaLabel={`Select ${kind} mode`}
      onClick={() => dispatch.newMode(kind)}
    >
      {children}
      <div className="align-center grid w-full grid-cols-2">
        <label htmlFor={id} className="block font-semibold">
          Cipher Key:
        </label>
        <input
          name={`${kind}-cipher-key`}
          ref={encryptionRef}
          disabled={mode !== kind}
          id={id}
          className="w-full rounded-sm border-2 border-gray-200 p-1 dark:border-gray-600"
          onChange={(e) => dispatch.newKey(e.target.value)}
          spellCheck="false"
        />
      </div>
    </Card>
  );
}

function FrequencyAnalysisCard() {
  const id = useId();
  const dispatch = useCipherStore((x) => x.actions);
  const mode = useCipherStore((x) => x.kind);
  const autoFocus = useCipherStore((x) => x.autoFocusMode);

  const keyLenRef = useCallback(
    (ref: HTMLInputElement | null) => {
      if (autoFocus === "Frequency Analysis" && ref) {
        ref.focus();
        ref.select();
      }
    },
    [autoFocus],
  );

  return (
    <Card
      title="Frequency Analysis"
      ariaLabel="Select frequency analysis mode"
      selected={mode === "Frequency Analysis"}
      onClick={() => dispatch.newMode("Frequency Analysis")}
    >
      <p className="grow text-left">
        Attempts to recover the cipher key of up to a given length that outputs
        plaintext with letters that occur at the same frequency as English text.
      </p>
      <div className="align-center grid w-full grid-cols-2">
        <label htmlFor={id} className="block font-semibold">
          Max Key Length:
        </label>
        <input
          name="max-key-length"
          ref={keyLenRef}
          disabled={mode !== "Frequency Analysis"}
          id={id}
          className="w-24 rounded-sm border-2 border-gray-200 p-1 dark:border-gray-600"
          type="number"
          required={mode === "Frequency Analysis"}
          placeholder="10"
          min="1"
          max="100"
          onChange={(e) => {
            if (e.target.validity.valid) {
              dispatch.newMaxKey(e.target.valueAsNumber);
            }
          }}
        />
      </div>
    </Card>
  );
}

function CryptModeHeader() {
  const mode = useCipherStore((x) => x.kind);
  return (
    <h2 className="text-lg">
      Selected cryptographic mode: {mode.toLocaleLowerCase()}
    </h2>
  );
}

export const CipherApp = () => {
  const dispatch = useCipherStore((x) => x.actions);
  const id = useId();

  return (
    <>
      <div className="my-4">
        <div className="mx-auto mb-4 max-w-prose">
          <CryptModeHeader />
        </div>
        <div className="align-center mx-auto flex w-fit grid-cols-3 flex-wrap justify-center gap-3 lg:grid">
          <CryptCard kind="Encryption">
            <p className="grow text-left">
              Substitute letters of the input by shifting them to the right by
              the index of the next letter in the cipher key appears in the
              alphabet.
            </p>
          </CryptCard>

          <CryptCard kind="Decryption">
            <p className="grow text-left">
              Reverses encryption by shifting input letters to the left to
              recover the plaintext.
            </p>
          </CryptCard>

          <FrequencyAnalysisCard />
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
            className={`${classes["cipher-input"]} h-full min-h-12 w-full border-2 border-gray-200 p-1 dark:border-gray-600`}
            onChange={(e) => dispatch.newInput(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="flex flex-col" data-test-id="output">
          <CipherOutput />
        </div>
      </div>
    </>
  );
};

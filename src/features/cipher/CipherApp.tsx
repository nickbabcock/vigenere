import React, { useCallback, useId } from "react";
import { Card } from "../../components/Card";
import { CipherOutput } from "./CipherOutput";
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
      <p className="grow text-sm leading-relaxed text-soft">{children}</p>
      <div className="mt-auto">
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
          Cipher Key:
        </label>
        <input
          name={`${kind}-cipher-key`}
          ref={encryptionRef}
          disabled={mode !== kind}
          id={id}
          className="field w-full px-2.5 py-1.5"
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
      <p className="grow text-sm leading-relaxed text-soft">
        Attempts to recover the cipher key of up to a given length that outputs
        plaintext with letters that occur at the same frequency as English text.
      </p>
      <div className="mt-auto">
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
          Max Key Length:
        </label>
        <input
          name="max-key-length"
          ref={keyLenRef}
          disabled={mode !== "Frequency Analysis"}
          id={id}
          className="field w-24 px-2.5 py-1.5"
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
    <h2 className="text-sm text-soft">
      Selected mode:{" "}
      <span className="font-medium text-ink">{mode.toLocaleLowerCase()}</span>
    </h2>
  );
}

export const CipherApp = () => {
  const dispatch = useCipherStore((x) => x.actions);
  const id = useId();

  return (
    <div className="flex grow flex-col gap-8">
      <section>
        <CryptModeHeader />
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CryptCard kind="Encryption">
            Substitute letters of the input by shifting them to the right by the
            index of the next letter in the cipher key as it appears in the
            alphabet.
          </CryptCard>

          <CryptCard kind="Decryption">
            Reverses encryption by shifting input letters to the left to recover
            the plaintext.
          </CryptCard>

          <FrequencyAnalysisCard />
        </div>
      </section>

      <section className="grid grow gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <label
            htmlFor={`${id}-input`}
            className="mb-1.5 text-sm font-medium text-ink"
          >
            Input
          </label>
          <textarea
            id={`${id}-input`}
            name="input"
            placeholder="Type or paste text to transform…"
            className="field min-h-40 w-full grow resize-y p-3 font-mono text-sm leading-relaxed"
            onChange={(e) => dispatch.newInput(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="flex flex-col" data-test-id="output">
          <CipherOutput />
        </div>
      </section>
    </div>
  );
};

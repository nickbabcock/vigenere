import React from "react";
import { useCipherStore } from "./cipher-store";

function Readout({
  title,
  children,
}: React.PropsWithChildren<{ title: React.ReactNode }>) {
  return (
    <>
      <h3
        className="mb-1.5 text-sm font-medium text-ink"
        data-test-id="output-title"
      >
        {title}
      </h3>
      <div className="min-h-40 w-full grow overflow-auto rounded-md border border-line bg-raised p-3">
        {children}
      </div>
    </>
  );
}

export function CipherOutput() {
  const output = useCipherStore((s) => s.output);
  switch (output?.kind) {
    case undefined: {
      return (
        <Readout title="Output">
          <p className="font-mono text-sm text-soft">Awaiting input…</p>
        </Readout>
      );
    }
    case "Decryption":
    case "Encryption": {
      return (
        <Readout title="Output">
          <p
            className="font-mono text-sm leading-relaxed break-words whitespace-pre-wrap text-ink"
            data-test-id="output-body"
          >
            {output.text}
          </p>
        </Readout>
      );
    }
    case "Frequency Analysis": {
      return (
        <Readout
          title={
            <>
              Output (Key:{" "}
              <span className="font-semibold text-accent">
                {output.derivedKey}
              </span>
              )
            </>
          }
        >
          <p
            className="font-mono text-sm leading-relaxed break-words whitespace-pre-wrap text-ink"
            data-test-id="output-body"
          >
            {output.text}
          </p>
        </Readout>
      );
    }
  }
}

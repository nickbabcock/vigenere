import React from "react";
import { useCipherStore } from "./cipher-store";

export function CipherOutput() {
  const output = useCipherStore((s) => s.output);
  switch (output?.kind) {
    case undefined: {
      return (
        <>
          <h3 className="text-lg" data-test-id="output-title">
            Output
          </h3>
        </>
      );
    }
    case "Decryption":
    case "Encryption": {
      return (
        <>
          <h3 className="text-lg" data-test-id="output-title">
            Output
          </h3>
          <p data-test-id="output-body">{output.text}</p>
        </>
      );
    }
    case "Frequency Analysis": {
      return (
        <>
          <h3 className="text-lg" data-test-id="output-title">
            Output (Key: {output.derivedKey})
          </h3>
          <p className="text-lg" data-test-id="output-body">
            {output.text}
          </p>
        </>
      );
    }
  }
}

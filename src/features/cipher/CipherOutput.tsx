import React from "react";
import { CipherOutputKind } from "./types";

interface CipherOutputProps {
  output?: CipherOutputKind;
}

export const CipherOutput = React.memo(function CipherOutput({
  output,
}: CipherOutputProps) {
  switch (output?.kind) {
    case undefined: {
      return (
        <>
          <h3 className="m-0" data-test-id="output-title">
            Output
          </h3>
        </>
      );
    }
    case "Decryption":
    case "Encryption": {
      return (
        <>
          <h3 className="m-0" data-test-id="output-title">
            Output
          </h3>
          <p className="m-0" data-test-id="output-body">
            {output.text}
          </p>
        </>
      );
    }
    case "Frequency Analysis": {
      return (
        <>
          <h3 className="m-0" data-test-id="output-title">
            Output (Key: {output.derivedKey})
          </h3>
          <p className="m-0" data-test-id="output-body">
            {output.text}
          </p>
        </>
      );
    }
  }
});

import { useReducer } from "react";
import { CipherKind, CipherOutputKind, Crypt } from "./types";

interface CipherState {
  mode: CipherKind;
  output?: CipherOutputKind;
}

type CipherAction =
  | {
      kind: "new-mode";
      mode: Crypt["kind"];
    }
  | {
      kind: "new-input";
      input: string;
    }
  | {
      kind: "new-key";
      key: string;
    }
  | {
      kind: "new-max-key";
      maxKeyLen: number;
    }
  | {
      kind: "new-output";
      output: CipherOutputKind;
    };

function cipherReducer(state: CipherState, action: CipherAction): CipherState {
  switch (action.kind) {
    case "new-mode": {
      return action.mode === state.mode.kind
        ? state
        : {
            ...state,
            mode: {
              ...state.mode,
              kind: action.mode,
            },
          };
    }
    case "new-input": {
      return {
        ...state,
        mode: {
          ...state.mode,
          input: action.input,
        },
      };
    }
    case "new-key": {
      return {
        ...state,
        mode: {
          ...state.mode,
          cipherKey: action.key,
        },
      };
    }
    case "new-max-key": {
      return {
        ...state,
        mode: {
          ...state.mode,
          maxKeyLen: action.maxKeyLen,
        },
      };
    }
    case "new-output": {
      return {
        ...state,
        output: action.output,
      };
    }
  }
}

export const useCipherReducer = () => {
  return useReducer(cipherReducer, {
    mode: { kind: "Encryption", cipherKey: "" },
  });
};

export type Crypt =
  | {
      kind: "Encryption";
    }
  | {
      kind: "Decryption";
    }
  | {
      kind: "Frequency Analysis";
    };

export interface CipherKind {
  kind: Crypt["kind"];
  cipherKey?: string;
  maxKeyLen?: number;
  input?: string;
}

export type CipherOutputKind =
  | {
      kind: "Encryption" | "Decryption";
      text: string;
    }
  | {
      kind: "Frequency Analysis";
      derivedKey: string;
      text: string;
    };
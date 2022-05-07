export type Crypt =
  | {
      kind: "Encryption";
    }
  | {
      kind: "Decryption";
    }
  | {
      kind: "Decryption with Key";
    };

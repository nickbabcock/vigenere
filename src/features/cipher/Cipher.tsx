import { useState, useEffect } from "react";
import { decrypt, encrypt, recoverVigenere } from "../../lib/vigenere-cipher";
import { Crypt } from "./types";

const keyText = (mode: Crypt["kind"]) => {
  switch (mode) {
    case "Encryption":
    case "Decryption with Key":
      return "Cipher Key";
    case "Decryption":
      return "Max Key Length";
  }
};

export const Cipher = () => {
  const [mode, setMode] = useState<Crypt["kind"]>("Encryption");
  const [key, setKey] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [recoveredKey, setRecoveredKey] = useState<string>("");

  useEffect(() => {
    if (!key || !input) {
      setOutput("");
      return;
    }

    switch (mode) {
      case "Encryption": {
        setOutput(encrypt(input, key));
        break;
      }
      case "Decryption with Key": {
        setOutput(decrypt(input, key));
      }
      case "Decryption": {
        if (!isNaN(+key)) {
          const result = recoverVigenere(input, +key);
          setRecoveredKey(result.key);
          setOutput(result.plainText);
        }
        break;
      }
    }
  }, [key, input]);

  const modeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setKey("");
    setRecoveredKey("");
    setMode(e.target.value as Crypt["kind"]);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 align-baseline">
          <label htmlFor="cryptMode">Cryptographic mode:</label>
          <select id="cryptMode" value={mode} onChange={modeChange}>
            <option value="Encryption">Encryption</option>
            <option value="Decryption">Decryption</option>
            <option value="Decryption with Key">Decryption with Key</option>
          </select>
        </div>

        <div>
          <label htmlFor="valueText" className="block">
            {keyText(mode)}:
          </label>
          <input
            id="valueText"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="inputText" className="block">
            Plain / Cipher text:
          </label>
          <textarea
            id="inputText"
            value={input}
            className="width-full min-h-12"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      {recoveredKey && <p>{`Recovered key: ${recoveredKey}`}</p>}
      <p id="output">{output}</p>
    </>
  );
};

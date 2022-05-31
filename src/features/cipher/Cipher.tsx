import { CipherWorkerProvider } from "./cipher-worker-context";
import { CipherApp } from "./CipherApp";

export const Cipher = () => {
  return (
    <CipherWorkerProvider>
      <CipherApp />
    </CipherWorkerProvider>
  );
};

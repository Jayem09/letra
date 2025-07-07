import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'crypto';

// Polyfill for older Node.js versions
if (!globalThis.crypto) {
  const { webcrypto } = await import('crypto');
  globalThis.crypto = {
    ...webcrypto,
    hash: (algorithm, data) => {
      return createHash(algorithm).update(data).digest();
    }
  };
}

export default defineConfig({
  plugins: [react()],
});
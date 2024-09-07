import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  webServer: {
    command: "npm run build && npm run start",
    port: 3335,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;

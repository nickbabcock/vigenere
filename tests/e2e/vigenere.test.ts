import { test, expect } from "@playwright/test";

test("identity caesar", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('input[name="Encryption-cipher-key"]').fill("a");
  await page.locator('textarea[name="input"]').fill("hello");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "hello".toUpperCase(),
  );
});

test("encryption", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('input[name="Encryption-cipher-key"]').fill("abc");
  await page.locator('textarea[name="input"]').fill("hello world");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HFNLP YOSND",
  );
});

test("encryption click label", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page
    .locator('[aria-label="Select Encryption mode"] >> text="Cipher Key:"')
    .click();
  await page.keyboard.type("abc");
  await page.locator('textarea[name="input"]').fill("hello world");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HFNLP YOSND",
  );
});

test("encryption click card", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('[aria-label="Select Encryption mode"]').click();
  await page.keyboard.type("abc");
  await page.locator('textarea[name="input"]').fill("hello world");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HFNLP YOSND",
  );
});

test("decryption click card", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('[aria-label="Select Decryption mode"]').click();
  await page.keyboard.type("abc");
  await page.locator('textarea[name="input"]').fill("HFNLP YOSND");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HELLO WORLD",
  );
});

test("decryption click label", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page
    .locator('[aria-label="Select Decryption mode"] >> text="Cipher Key:"')
    .click();
  await page.keyboard.type("abc");
  await page.locator('textarea[name="input"]').fill("HFNLP YOSND");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HELLO WORLD",
  );
});

test("decryption click input", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('[name="Decryption-cipher-key"]').click({ force: true });
  await page.keyboard.type("abc");
  await page.locator('textarea[name="input"]').fill("HFNLP YOSND");
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    "HELLO WORLD",
  );
});

const frequencyAnalysisInput =
  "IIEHSAB YTP HRO OONQP EKLVP HOO O MPUF WEPOZM WCLLRODVED ZY VWMEP CB UIPDA SAACOWKTRU SQ NVWFRNWLV. MTBCZVJ ZHW PYRAOIPG AS OLFYM SJ WOI PLGEBVDV VTPYBAGJ LQK HFNHEZZEB VJ STG PSDAHY XSZICV EZ GPWAZGEHZZQ JSFWR KTWPU H KCPOPSI NRUXCLGP HF SLZ SHY OJR KSRBKS HWPV YTV VAY SS JSMPU HTAPONSU OLZWLEWOTZPG. VR ESS OHIPQNXS ZT ZOINB'Z VPRONR STQNPPJ VWR KSH MMCXSOH IPOPEYNS WBU ZI OMD UIZUVXHUX ESS DWXSHZX ZAWJWFY. LU YYOSNGKLQKMYR RWFTJ ZHW ESS OIGPUPSC. MWJUCPB DED MM JC DPDUW OPTEQZPQA FFE RWFTJ ZHW NWSRSI. SH DED LH PVV DDTI ETAA VRFJOXJ CSOSIGHK EYO TWGKTGPSFD OJR YTV TEYYSNG KSRBKS HSHZ-SCHK APCS JCK TQCMETBC. WE EKHX CPGLSTE KPW QCWABU SDK KCPOPZP EKL EOGOJHRRH. IMYRZAM NLV ZYCP CB PVTQN PTVSZ KYPULZPC VA OGAHHVPO RWFTJ ZHW NZBPWEFDSPJ RWRWER RMJPYGA.";
const frequencyAnalysisOutput =
  "BETWEEN HIM AND DARCY THERE WAS A VERY STEADY FRIENDSHIP IN SPITE OF GREAT OPPOSITION OF CHARACTER. BINGLEY WAS ENDEARED TO DARCY BY THE EASINESS OPENNESS AND DUCTILITY OF HIS TEMPER THOUGH NO DISPOSITION COULD OFFER A GREATER CONTRAST TO HIS OWN AND THOUGH WITH HIS OWN HE NEVER APPEARED DISSATISFIED. ON THE STRENGTH OF DARCY'S REGARD BINGLEY HAD THE FIRMEST RELIANCE AND OF HIS JUDGEMENT THE HIGHEST OPINION. IN UNDERSTANDING DARCY WAS THE SUPERIOR. BINGLEY WAS BY NO MEANS DEFICIENT BUT DARCY WAS CLEVER. HE WAS AT THE SAME TIME HAUGHTY RESERVED AND FASTIDIOUS AND HIS MANNERS THOUGH WELL-BRED WERE NOT INVITING. IN THAT RESPECT HIS FRIEND HAD GREATLY THE ADVANTAGE. BINGLEY WAS SURE OF BEING LIKED WHEREVER HE APPEARED DARCY WAS CONTINUALLY GIVING OFFENSE.";

test("frequency-analysis click card", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('[aria-label="Select frequency analysis mode"]').click();
  await page.keyboard.type("20");
  await page.locator('textarea[name="input"]').fill(frequencyAnalysisInput);
  await expect(page.locator("data-test-id=output-title")).toContainText(
    "HELLOWORLD",
  );
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    frequencyAnalysisOutput,
  );
});

test("frequency-analysis click label", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('text="Max Key Length:"').click();
  await page.keyboard.type("20");
  await page.locator('textarea[name="input"]').fill(frequencyAnalysisInput);
  await expect(page.locator("data-test-id=output-title")).toContainText(
    "HELLOWORLD",
  );
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    frequencyAnalysisOutput,
  );
});

test("frequency-analysis click input", async ({ page, baseURL }) => {
  await page.goto(baseURL + "");
  await page.locator('[name="max-key-length"]').click({ force: true });
  await page.keyboard.type("20");
  await page.locator('textarea[name="input"]').fill(frequencyAnalysisInput);
  await expect(page.locator("data-test-id=output-title")).toContainText(
    "HELLOWORLD",
  );
  await expect(page.locator("data-test-id=output-body")).toHaveText(
    frequencyAnalysisOutput,
  );
});

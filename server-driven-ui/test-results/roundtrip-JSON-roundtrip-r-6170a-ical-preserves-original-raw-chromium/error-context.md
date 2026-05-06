# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: roundtrip.spec.ts >> JSON roundtrip >> reordered keys but structurally identical preserves original raw
- Location: tests\roundtrip.spec.ts:66:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "{ \"ROOT\": { \"props\": {}, \"isCanvas\": true, \"nodes\": [], \"type\": { \"resolvedName\": \"Container\" } } }"
Received: "{\"ROOT\":{\"type\":{\"resolvedName\":\"Container\"},\"isCanvas\":true,\"props\":{\"backgroundColor\":\"#ffffff\",\"width\":\"100%\",\"minHeight\":\"auto\",\"borderRadius\":\"0px\",\"paddingTop\":\"16px\",\"paddingRight\":\"16px\",\"paddingBottom\":\"16px\",\"paddingLeft\":\"16px\",\"marginTop\":\"0px\",\"marginRight\":\"0px\",\"marginBottom\":\"0px\",\"marginLeft\":\"0px\"},\"displayName\":\"Container\",\"custom\":{},\"hidden\":false,\"nodes\":[],\"linkedNodes\":{}}}"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - img [ref=e4]
    - heading "Access Denied" [level=1] [ref=e6]
    - paragraph [ref=e7]: Please log in to view templates
    - link "Go to Login" [ref=e8] [cursor=pointer]:
      - /url: /login
  - region "Notifications alt+T":
    - list:
      - listitem [ref=e9]:
        - img [ref=e11]
        - generic [ref=e14]: Template draft saved
  - button "Open Next.js Dev Tools" [ref=e20] [cursor=pointer]:
    - img [ref=e21]
  - alert [ref=e24]
```

# Test source

```ts
  1  | import { test, expect, Page } from "@playwright/test";
  2  | 
  3  | const editorUrl = "http://localhost:3000/edit/new?templateDesigner=1";
  4  | 
  5  | async function seedAndSave(page: Page, raw: string) {
  6  |   const messages: Array<{ type: string; text: string }> = [];
  7  |   const handler = (m: any) => messages.push({ type: m.type(), text: m.text() });
  8  |   page.on("console", handler);
  9  | 
  10 |   await page.goto("http://localhost:3000");
  11 |   await page.evaluate((rawStr: string) => {
  12 |     sessionStorage.setItem("templateConfig", rawStr);
  13 |     sessionStorage.setItem(
  14 |       "templateDraftMeta",
  15 |       JSON.stringify({ name: "Roundtrip Test" }),
  16 |     );
  17 |   }, raw);
  18 | 
  19 |   await page.goto(editorUrl);
  20 |   await page.waitForSelector("text=Save as Template", { timeout: 15000 });
  21 | 
  22 |   // Assert there were no console errors during load
  23 |   const hasConsoleErrors = messages.some((m) => m.type === "error");
  24 |   // detach handler before interactions to avoid capturing unrelated logs
  25 |   page.off("console", handler);
  26 |   if (hasConsoleErrors) {
  27 |     // include captured messages in the failure for debugging
  28 |     throw new Error(
  29 |       "Console errors detected during editor load: " +
  30 |         JSON.stringify(messages.slice(0, 20)),
  31 |     );
  32 |   }
  33 | 
  34 |   // Re-attach to capture during save
  35 |   const saveMessages: Array<{ type: string; text: string }> = [];
  36 |   const saveHandler = (m: any) =>
  37 |     saveMessages.push({ type: m.type(), text: m.text() });
  38 |   page.on("console", saveHandler);
  39 | 
  40 |   await page.click("text=Save as Template");
  41 |   await page.waitForTimeout(800);
  42 |   const saved = await page.evaluate(() =>
  43 |     sessionStorage.getItem("templateConfig"),
  44 |   );
  45 | 
  46 |   page.off("console", saveHandler);
  47 |   const hadSaveErrors = saveMessages.some((m) => m.type === "error");
  48 |   if (hadSaveErrors) {
  49 |     throw new Error(
  50 |       "Console errors detected during save: " +
  51 |         JSON.stringify(saveMessages.slice(0, 20)),
  52 |     );
  53 |   }
  54 | 
  55 |   return saved;
  56 | }
  57 | 
  58 | test.describe("JSON roundtrip", () => {
  59 |   test("exact string preserved", async ({ page }) => {
  60 |     const originalRaw =
  61 |       '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }';
  62 |     const saved = await seedAndSave(page, originalRaw);
  63 |     expect(saved).toBe(originalRaw);
  64 |   });
  65 | 
  66 |   test("reordered keys but structurally identical preserves original raw", async ({
  67 |     page,
  68 |   }) => {
  69 |     const originalRaw =
  70 |       '{ "ROOT": { "props": {}, "isCanvas": true, "nodes": [], "type": { "resolvedName": "Container" } } }';
  71 |     const reordered =
  72 |       '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }';
  73 |     // seed with reordered form but editor serialization may normalize ordering; original raw should be preserved if structure equal
  74 |     const saved = await seedAndSave(page, originalRaw);
> 75 |     expect(saved).toBe(originalRaw);
     |                   ^ Error: expect(received).toBe(expected) // Object.is equality
  76 |     // Also verify that saved parsed structure equals parsed of reordered
  77 |     expect(JSON.parse(saved!)).toEqual(JSON.parse(reordered));
  78 |   });
  79 | 
  80 |   test("structurally different JSON does not preserve original raw", async ({
  81 |     page,
  82 |   }) => {
  83 |     const originalRaw =
  84 |       '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": { "a": 1 } } }';
  85 |     const saved = await seedAndSave(page, originalRaw);
  86 |     // If editor serialized a different structure, it should not equal the original raw
  87 |     expect(saved).not.toBe(
  88 |       '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }',
  89 |     );
  90 |   });
  91 | });
  92 | 
```
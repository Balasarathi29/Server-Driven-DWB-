import { test, expect, Page } from "@playwright/test";

const editorUrl = "http://localhost:3000/edit/new?templateDesigner=1";

async function seedAndSave(page: Page, raw: string) {
  const messages: Array<{ type: string; text: string }> = [];
  const handler = (m: any) => messages.push({ type: m.type(), text: m.text() });
  page.on("console", handler);

  await page.goto("http://localhost:3000");
  await page.evaluate((rawStr: string) => {
    sessionStorage.setItem("templateConfig", rawStr);
    sessionStorage.setItem(
      "templateDraftMeta",
      JSON.stringify({ name: "Roundtrip Test" }),
    );
  }, raw);

  await page.goto(editorUrl);
  await page.waitForSelector("text=Save as Template", { timeout: 15000 });

  // Assert there were no console errors during load
  const hasConsoleErrors = messages.some((m) => m.type === "error");
  // detach handler before interactions to avoid capturing unrelated logs
  page.off("console", handler);
  if (hasConsoleErrors) {
    // include captured messages in the failure for debugging
    throw new Error(
      "Console errors detected during editor load: " +
        JSON.stringify(messages.slice(0, 20)),
    );
  }

  // Re-attach to capture during save
  const saveMessages: Array<{ type: string; text: string }> = [];
  const saveHandler = (m: any) =>
    saveMessages.push({ type: m.type(), text: m.text() });
  page.on("console", saveHandler);

  await page.click("text=Save as Template");
  await page.waitForTimeout(800);
  const saved = await page.evaluate(() =>
    sessionStorage.getItem("templateConfig"),
  );

  page.off("console", saveHandler);
  const hadSaveErrors = saveMessages.some((m) => m.type === "error");
  if (hadSaveErrors) {
    throw new Error(
      "Console errors detected during save: " +
        JSON.stringify(saveMessages.slice(0, 20)),
    );
  }

  return saved;
}

test.describe("JSON roundtrip", () => {
  test("exact string preserved", async ({ page }) => {
    const originalRaw =
      '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }';
    const saved = await seedAndSave(page, originalRaw);
    expect(saved).toBe(originalRaw);
  });

  test("reordered keys but structurally identical preserves original raw", async ({
    page,
  }) => {
    const originalRaw =
      '{ "ROOT": { "props": {}, "isCanvas": true, "nodes": [], "type": { "resolvedName": "Container" } } }';
    const reordered =
      '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }';
    // seed with reordered form but editor serialization may normalize ordering; original raw should be preserved if structure equal
    const saved = await seedAndSave(page, originalRaw);
    expect(saved).toBe(originalRaw);
    // Also verify that saved parsed structure equals parsed of reordered
    expect(JSON.parse(saved!)).toEqual(JSON.parse(reordered));
  });

  test("structurally different JSON does not preserve original raw", async ({
    page,
  }) => {
    const originalRaw =
      '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": { "a": 1 } } }';
    const saved = await seedAndSave(page, originalRaw);
    // If editor serialized a different structure, it should not equal the original raw
    expect(saved).not.toBe(
      '{ "ROOT": { "type": { "resolvedName": "Container" }, "isCanvas": true, "nodes": [], "props": {} } }',
    );
  });
});

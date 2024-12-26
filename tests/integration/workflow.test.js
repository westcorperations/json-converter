import JSONFormatConverter from "../../index.js";
import { writeFile, unlink, stat, readFile } from "fs/promises";
import path from "path";

describe("Workflow Integration Tests", () => {
  let converter;

  beforeAll(() => {
    converter = new JSONFormatConverter();
  });

    const sampleData = [
        { name: "John", age: 30, email: "john@test.com" },
        { name: "Jane", age: 25, email: "jane@test.com" },
    ];

  test("should complete full CSV workflow", async () => {
    const csvData = await converter.convertToCSV(sampleData);
    const filePath = path.join(process.cwd(), "test-output.csv");
    await writeFile(filePath, csvData);

    const fileContent = await readFile(filePath, "utf8");
    expect(fileContent).toContain('"name","age","email"');

    await unlink(filePath);
  });

  test("should complete full PDF workflow", async () => {
    // Convert to PDF
    const pdfData = await converter.convertToPDF(sampleData);

    // Save to file
    const filePath = path.join(process.cwd(), "test-output.pdf");
    await writeFile(filePath, pdfData);

    // Verify file exists and is PDF
    const stats = await stat(filePath);
    expect(stats.size).toBeGreaterThan(0);

    // Cleanup
    await unlink(filePath);
  });
});

import { pdfService } from "../../libs/services/pdfService.js";

describe("PDF Service", () => {
  const sampleData = {
    users: [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ],
  };

  test("should convert JSON to PDF buffer", async () => {
    const result = await pdfService.convert(sampleData);
    expect(Buffer.isBuffer(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  
});

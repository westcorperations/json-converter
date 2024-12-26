import request from "supertest";
import JSONFormatConverter from "../../index.js";


describe("JSON Format Converter", () => {
  let app;
  let converter;

  beforeAll(() => {
    converter = new JSONFormatConverter({ port: 3001 });
    app = converter.getApp();
  });

  const sampleData = 
    [
      { name: "John", age: 30, email: "john@test.com" },
      { name: "Jane", age: 25, email: "jane@test.com" },
    ];

  describe("Direct Conversion Methods", () => {
    test("should convert flat JSON array to CSV", async () => {
      const result = await converter.convertToCSV(sampleData);
      expect(result).toContain('"name","age","email"');
      expect(result).toContain('"John",30,"john@test.com"');
      expect(result).toContain('"Jane",25,"jane@test.com"');
    });
  });

  describe("API Endpoints", () => {
    test("should convert to CSV via API", async () => {
      const result = await request(app)
        .post("/api/convert/csv")
        .send(sampleData)
        .expect(200);
    });

    test("should handle invalid JSON", async () => {
      await request(app).post("/api/convert/csv").send({}).expect(400);
    });

    test("should handle server errors", async () => {
      await request(app).post("/api/convert/csv").send(null).expect(400);
    });
  });
});

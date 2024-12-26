import request from "supertest";
import JSONFormatConverter from "../../index.js";

describe("JSON Format Converter", () => {
  let app;
  let converter;

  beforeAll(() => {
    converter = new JSONFormatConverter({ port: 3001 });
    app = converter.getApp();
  });

  const sampleData = {
    users: [
      { name: "John", age: 30, email: "john@test.com" },
      { name: "Jane", age: 25, email: "jane@test.com" },
    ],
  };

  describe("Direct Conversion Methods", () => {
   
    test("should convert to PDF directly", async () => {
      const result = await converter.convertToPDF(sampleData);
      expect(Buffer.isBuffer(result)).toBeTruthy();
    });
  });

  describe("API Endpoints", () => {
    

    test("should convert to PDF via API", async () => {
      const response = await request(app)
        .post("/api/convert/pdf")
        .send(sampleData)
        .expect(200);

      expect(response.body).toBeTruthy();
    });

    test("should handle invalid JSON", async () => {
      await request(app).post("/api/convert/pdf").send({}).expect(400);
    });

    test("should handle server errors", async () => {
      await request(app).post("/api/convert/pdf").send(null).expect(400);
    });
  });
});

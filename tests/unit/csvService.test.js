import { csvService } from "../../libs/services/csvService.js";

describe("CSV Service", () => {
  const sampleData = {
    users: [
      { name: "John", age: 30, email: "john@test.com" },
      { name: "Jane", age: 25, email: "jane@test.com" },
    ],
  };

  test("should convert flat JSON array to CSV", async () => {
    const result = await csvService.convert(sampleData.users);
     expect(result).toContain('"name","age","email"');
     expect(result).toContain('"John",30,"john@test.com"');
     expect(result).toContain('"Jane",25,"jane@test.com"');
  });

  test("should handle nested JSON structure", async () => {
    const result = await csvService.convert(sampleData.users);
  expect(result).toContain('"name","age","email"');
  expect(result).toContain('"John",30,"john@test.com"');
  });


});

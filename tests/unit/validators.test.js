import { validateJSON } from "../../libs/utils/validators.js";

describe("JSON Validator", () => {
  test("should validate correct JSON", () => {
    expect(validateJSON({ key: "value" })).toBeTruthy();
    expect(validateJSON([{ key: "value" }])).toBeTruthy();
  });

  test("should reject invalid JSON", () => {
    expect(validateJSON(null)).toBeFalsy();
    expect(validateJSON(undefined)).toBeFalsy();
    expect(validateJSON("")).toBeFalsy();
    expect(validateJSON({})).toBeFalsy();
  });
});

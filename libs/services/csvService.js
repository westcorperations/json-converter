import { Parser } from "json2csv";

class CSVService {
  async convert(jsonData) {
    try {
      const data = Array.isArray(jsonData) ? jsonData : [jsonData];
      const fields = Object.keys(data[0] || {});

      const parser = new Parser({ fields });
      return parser.parse(data);
    } catch (error) {
      throw new Error(`CSV conversion failed: ${error.message}`);
    }
  }
}

export const csvService = new CSVService();

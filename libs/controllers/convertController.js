import { csvService } from "../services/csvService.js";
import { pdfService } from "../services/pdfService.js";
import { validateJSON } from "../utils/validators.js";

class ConvertController {
  async convertToCSV(req, res) {
    try {
      const jsonData = req.body;

      if (!validateJSON(jsonData)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid JSON input",
        });
      }

      const csvData = await csvService.convert(jsonData);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.status(200).send(csvData);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async convertToPDF(req, res) {
    try {
      const jsonData = req.body;

      if (!validateJSON(jsonData)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid JSON input",
        });
      }

      const pdfData = await pdfService.convert(jsonData);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=data.pdf");
      res.status(200).send(pdfData);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export const convertController = new ConvertController();

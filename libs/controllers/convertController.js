import { csvService } from "../services/csvService.js";
import { pdfService } from "../services/pdfService.js";
import { validateJSON } from "../utils/validators.js";
import logger from "../utils/logger.js";

class ConvertController {
  async convertToCSVAPI(req, res) {
    try {
      const jsonData = req.body;

      if (!validateJSON(jsonData)) {
        logger.warn("Invalid JSON input for CSV conversion");
        return res.status(400).json({
          status: "error",
          message: "Invalid JSON input",
        });
      }

      const csvData = await csvService.convert(jsonData);
      logger.info("CSV Conversion successful");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.status(200).send(csvData);
    } catch (error) {
      logger.error(
        `CSV Conversion failed: ${error.message}\nStack Trace: ${error.stack}`
      );
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async convertToPDFAPI(req, res) {
    try {
      const jsonData = req.body;

      if (!validateJSON(jsonData)) {
        logger.warn("Invalid JSON input for PDF conversion");
        return res.status(400).json({
          status: "error",
          message: "Invalid JSON input",
        });
      }

      const pdfData = await pdfService.convert(jsonData);
      logger.info("PDF Conversion successful");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=data.pdf");
      res.status(200).send(pdfData);
    } catch (error) {
      logger.error(
        `PDF Conversion failed: ${error.message}\nStack Trace: ${error.stack}`
      );
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async convertToCSV(jsonData) {
    try {
      if (!validateJSON(jsonData)) {
        throw new Error("Invalid JSON input");
      }

      const csvData = await csvService.convert(jsonData);
      return csvData;
    } catch (error) {
      logger.error(
        `CSV Conversion failed: ${error.message}\nStack Trace: ${error.stack}`
      );
      throw new Error(`CSV Conversion failed: ${error.message}`);
    }
  }

  async convertToPDF(jsonData) {
    try {
      if (!validateJSON(jsonData)) {
        throw new Error("Invalid JSON input");
      }

      const pdfData = await pdfService.convert(jsonData);
      return pdfData;
    } catch (error) {
      logger.error(
        `PDF Conversion failed: ${error.message}\nStack Trace: ${error.stack}`
      );
      throw new Error(`PDF Conversion failed: ${error.message}`);
    }
  }
}

export const convertController = new ConvertController();

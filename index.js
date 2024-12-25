import express from "express";
import helmet from "helmet";
import cors from "cors";
import { convertController } from "./libs/controllers/convertController.js";
import { convertRouter } from "./libs/routes/convertRoutes.js";

class JSONFormatConverter {
  constructor(options = {}) {
    this.app = express();
    this.options = {
      port: options.port || 3000,
      corsOption:options.corsOption || {},
      ...options,
    };

    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Configures middleware for the Express application.
   *
   * - Uses Helmet to enhance security by setting various HTTP headers.
   * - Enables CORS with specified options to allow cross-origin requests.
   * - Parses incoming JSON requests with a body size limit of 10MB.
   */
  setupMiddleware() {
    this.app.use(helmet());
    this.app.use(cors(this.options.corsOption));
    this.app.use(express.json({ limit: "10mb" }));
  }

  /**
   * Sets up the routing for the Express application.
   *
   * Registers the '/api/convert' endpoint with the convertRoutes
   * to handle conversion-related requests.
   */
  setupRoutes() {
    this.app.use("/api/convert", convertRouter);
  }

  /**
   * Converts JSON data to CSV format.
   *
   * @param {Object} jsonData - The JSON data to be converted.
   * @returns {Promise<string>} A promise that resolves to the CSV string.
   */
  async convertToCSV(jsonData) {
    return convertController.convertToCSV(jsonData);
  }

  /**
   * Converts JSON data to PDF format.
   *
   * @param {Object} jsonData - The JSON data to be converted.
   * @returns {Promise<Buffer>} A promise that resolves to a PDF buffer.
   */
  async convertToPDF(jsonData) {
    return convertController.convertToPDF(jsonData);
  }

  /**
   * Starts the Express server on the specified port.
   *
   * @param {Function} callback - A callback function to execute once the server starts listening.
   * @returns {Server} The HTTP server instance.
   */
  listen(callback) {
    return this.app.listen(this.options.port, callback);
  }

  /**
   * Retrieves the Express application instance.
   *
   * @returns {Express} The Express application instance.
   */
  getApp() {
    return this.app;
  }
}

export default JSONFormatConverter;

import PDFDocument from "pdfkit";

class PDFService {
  async convert(jsonData) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.fontSize(12).text(JSON.stringify(jsonData, null, 2));
        doc.end();
      } catch (error) {
        reject(new Error(`PDF conversion failed: ${error.message}`));
      }
    });
  }
}
export const pdfService = new PDFService();

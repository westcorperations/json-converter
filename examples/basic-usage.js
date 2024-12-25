import JSONFormatConverter from "../index.js";

// Example 1: Using as an Express server
const converter = new JSONFormatConverter({ port: 3000 });
converter.listen(() => {
  console.log("Converter server running on port 3000");
});

// Example 2: Using direct conversion methods
const directConversion = async () => {
  const converter = new JSONFormatConverter();

  const jsonData = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];

  try {
    const csvData = await converter.convertToCSV(jsonData);
    console.log("CSV Data:", csvData);

    const pdfBuffer = await converter.convertToPDF(jsonData);
    console.log("PDF Buffer generated:", pdfBuffer.length, "bytes");
  } catch (error) {
    console.error("Conversion error:", error);
  }
};

directConversion();

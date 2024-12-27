
# JSON Format Converter

A Node.js package that converts JSON data to various formats including CSV and PDF. Provides both direct conversion methods and a REST API server.

## Installation

```bash
npm install json-format-converter
```

## Features

- Convert JSON to CSV format
- Convert JSON to PDF format
- Support for nested JSON structures
- Built-in Express server for API endpoints
- Direct conversion methods
- Error handling and validation

## Quick Start

### Using as a Package

```javascript
import JSONFormatConverter from 'json-format-converter';

const converter = new JSONFormatConverter();

// Sample data
const data = [
        { name: "John Smith", age: 30, email: "john@example.com" },
        { name: "Jane Doe", age: 25, email: "jane@example.com" }
    ];

// Convert to CSV
const csvData = await converter.convertToCSV(data);

// Convert to PDF
const pdfData = await converter.convertToPDF(data);
```

### Using as an API Server

```javascript
import JSONFormatConverter from 'json-format-converter';

const converter = new JSONFormatConverter({ port: 3000 });

converter.listen(() => {
    console.log('Server running on port 3000');
});
```

Then make POST requests to:

- `/api/convert/csv` - for CSV conversion
- `/api/convert/pdf` - for PDF conversion

## API Reference

### Class: JSONFormatConverter

#### Constructor Options

```javascript
const options = {
    port: 3000,              // Server port number (default: 3000)
    corsOptions: {},         // CORS configuration options
}

const converter = new JSONFormatConverter(options);
```

#### Methods

- `convertToCSV(jsonData)`: Convert JSON to CSV
- `convertToPDF(jsonData)`: Convert JSON to PDF
- `listen(callback)`: Start the Express server

## Example Usage

### Converting to CSV

```javascript
const data = [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 }
    ];

const csvData = await converter.convertToCSV(data);
```

### Converting to PDF

```javascript
const pdfData = await converter.convertToPDF(data);
```

### API Endpoints

Using curl:

```bash
# Convert to CSV
curl -X POST \
  http://localhost:3000/api/convert/csv \
  -H "Content-Type: application/json" \
  -d '[{"name":"John","age":30},{"name":"Jane","age":25}]'

# Convert to PDF
curl -X POST \
  http://localhost:3000/api/convert/pdf \
  -H "Content-Type: application/json" \
  -d "["name":"John","age":30},{"name":"Jane","age":25}]"
```

## Error Handling

The package includes built-in error handling for:

- Invalid JSON input
- Empty data
- Conversion failures
- Server errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

[westlove]

## Support

For bugs and feature requests, please [open an issue](https://github.com/westcorperations/json-converter/issues).

## Changelog

### 1.0.0

- Initial release
- Basic CSV and PDF conversion
- API server functionality

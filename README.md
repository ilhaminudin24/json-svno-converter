# JSON SVNo Converter

A simple React application that extracts service order numbers (`svNo`) from complex JSON data structures.

## Features

- **Input/Output Interface**: Clean, modern UI with side-by-side JSON input and output areas
- **Sample Data**: Built-in sample data button to test the conversion
- **Error Handling**: Comprehensive error messages for invalid JSON
- **Copy to Clipboard**: Easy copying of converted JSON
- **Responsive Design**: Works on desktop and mobile devices

## How it works

1. **Input**: Paste your complex JSON with `@odata.context`, `value` array, etc.
2. **Processing**: The system extracts `svcOrdNo` from each `dfCreateDeliveryOrderServices` array
3. **Output**: Generates the simplified format: `[{"svNo": "23625096180"}, {"svNo": "23625096162"}]`

## Usage

1. **Load Sample Data**: Click "Load Sample Data" to see the tool in action
2. **Paste Your JSON**: Copy and paste your complex JSON data
3. **Convert**: Click "Convert" to transform the data
4. **Copy Result**: Use "Copy to Clipboard" to get the simplified JSON

## Installation

```bash
npm install
npm start
```

## Project Structure

```
json-svno-converter/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styling
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Key Conversion Logic

- Parses the `value` array from your JSON
- For each order, extracts `dfCreateDeliveryOrderServices`
- Maps each service's `svcOrdNo` to `svNo` in the output
- Flattens the result into a simple array

## Example

**Input:**
```json
{
  "@odata.context": "...",
  "value": [
    {
      "dfCreateDeliveryOrderServices": [
        {
          "svcOrdNo": "23625096180"
        }
      ]
    }
  ]
}
```

**Output:**
```json
[
  {
    "svNo": "23625096180"
  }
]
```

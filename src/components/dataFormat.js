import React, { useState } from "react";
import Papa from "papaparse"; // library to parse CSV files
import { readString } from "react-papaparse";
import { formatCsvData, compareData } from "../utils/utils";

function DataFormat() {
  const [csvData, setCsvData] = useState(null);
  const [prnData, setPrnData] = useState([]);
  const [viewType, setViewType] = useState("table");

  const handleCsvFile = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        setCsvData(results.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handlePrnFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const prnString = e.target.result;
      const parsedPrnData = readString(prnString, { delimiter: "|" }).data;
      setPrnData(parsedPrnData);
    };
    reader.readAsText(file);
  };

  const toggleView = () => {
    viewType === "table" ? setViewType("json") : setViewType("table");
  };

  const tableData = formatCsvData(csvData);
  const jsonData = JSON.stringify(formatCsvData(csvData), null, 2);

  return (
    <div className="App">
      <div>
        <h1 className="title">Data formatting web app</h1>
        <div className="file-uploader-container">
          <label htmlFor="csv-file">Upload CSV File:</label>
          <input
            type="file"
            id="csv-file"
            onChange={(e) => handleCsvFile(e.target.files[0])}
          />
        </div>
        <div className="file-uploader-container">
          <label htmlFor="prn-file">Upload PRN File:</label>
          <input type="file" id="prn-file" onChange={handlePrnFileUpload} />
        </div>
        {tableData?.length > 0 && prnData.length > 0 && (
          <div className="action-container">
            <button
              onClick={() => {
                compareData(csvData, prnData);
              }}
            >
              Compare Data
            </button>
            <button onClick={toggleView}>Switch View</button>
          </div>
        )}
        {viewType === "table" && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {csvData &&
                    Object.keys(csvData[0]).map((key, index) => (
                      <th key={index}>{key.trim()}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {viewType === "json" && (
          <code>
            <pre className="json-code">{jsonData}</pre>
          </code>
        )}
      </div>
    </div>
  );
}

export default DataFormat;

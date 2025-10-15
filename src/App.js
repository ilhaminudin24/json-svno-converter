import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');
  const [separatedResults, setSeparatedResults] = useState({});

  const convertJson = () => {
    try {
      setError('');
      const parsedData = JSON.parse(inputJson);
      
      if (!parsedData.value || !Array.isArray(parsedData.value)) {
        throw new Error('Invalid JSON format. Expected "value" array.');
      }

      const convertedData = parsedData.value.map(item => {
        if (!item.dfCreateDeliveryOrderServices || !Array.isArray(item.dfCreateDeliveryOrderServices)) {
          return null;
        }

        return item.dfCreateDeliveryOrderServices.map(service => ({
          svNo: service.svcOrdNo,
          status: service.status || 'Unknown'
        }));
      }).flat().filter(item => item !== null);

      // Separate results by status
      const separated = {};
      convertedData.forEach(item => {
        const status = item.status;
        if (!separated[status]) {
          separated[status] = [];
        }
        separated[status].push({ svNo: item.svNo });
      });

      setSeparatedResults(separated);
      
      // Create combined results without status field
      const combinedResults = convertedData.map(item => ({
        svNo: item.svNo
      }));
      
      setOutputJson(JSON.stringify(combinedResults, null, 2));
    } catch (err) {
      setError(`Error: ${err.message}`);
      setOutputJson('');
    }
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
    setSeparatedResults({});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputJson);
  };

  const downloadJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllResults = () => {
    downloadJson(separatedResults, 'svno-results-by-status.json');
  };

  const downloadByStatus = (status) => {
    downloadJson(separatedResults[status], `svno-results-${status.replace(/[^a-zA-Z0-9]/g, '-')}.json`);
  };

  const loadSampleData = () => {
    const sampleData = {
      "@odata.context": "https://certina.dfi-ikea.co.id:7448/236NTML/api/k3/logistics/v1.0/$metadata#companies(441d97a0-7045-4c87-9d15-a55080d04886)/dfCreateDeliveryOrders",
      "@odata.count": 2,
      "value": [
        {
          "@odata.etag": "W/\"JzQ0O0xKTHZnREtXM3VybnlUOVNqc1g2OTcyV2VoaU5ReDhmdVlCQlBxYmR2WUk9MTswMDsn\"",
          "id": "fb5bf689-59c5-41f3-bc46-2bfdc4d85b3f",
          "shipRef": "23625076123",
          "storeNo": "236",
          "secondRef": "19049",
          "salesChannel": "ECOM",
          "orderDate": "2025-10-15",
          "productAmount": 224324.324324324324,
          "productAmountVat": 249000,
          "itemCnt": 1,
          "pkgs": 1,
          "payStatus": "",
          "shipCust": "Shopee",
          "shipAddr": "2510155HQVRG9Y - Jl. H. R. Rasuna Said GAMA TOWER FL 8 No.2, Karet Kuningan Kecamatan Setiabudi, Kota Jakarta Selatan",
          "locationCode": "Kecamatan Setiabudi, Kota Jakarta Selatan",
          "shipPostal": "00000",
          "pickDateTime": "0001-01-01T00:00:00Z",
          "shipCity": "Jakarta Selatan",
          "shipPhone": "(+62)855******94",
          "shipEmail": "tokped_production@ikea.co.id",
          "orderCmt": "",
          "codTask": false,
          "codAmount": 0,
          "dfCreateDeliveryOrderServices": [
            {
              "@odata.etag": "W/\"JzQ0Oy8rN2dZL0hybGNjQlM2dmFuWlRGcUpZdkExejFtOE5TeHpoY1hQaUR5ZjA9MTswMDsn\"",
              "documentId": "fb5bf689-59c5-41f3-bc46-2bfdc4d85b3f",
              "docLineNo": 1,
              "svcOrdNo": "23625096180",
              "svcItemNo": "JNESHOPEE1",
              "svcName": "Home Delivery Shopee JNE",
              "serviceProviderName": "JNE SHOPEE",
              "date": "2025-10-15",
              "timeslot": "10:59:59 PM..11:59:59 PM",
              "status": "Service Provider Contacted",
              "gdval": 0,
              "prxOrg": 0,
              "prxVat": 0,
              "NoOfPkgs": 1,
              "svcCmt": ""
            }
          ],
          "dfCreateDeliveryOrderServiceItems": [
            {
              "@odata.etag": "W/\"JzQ0O1pXWnFrMTJzNTMzN0xmTVBhMDMxOFBnTnk1YzV6L2hpam1pV0hQTWwzZk09MTswMDsn\"",
              "documentId": "fb5bf689-59c5-41f3-bc46-2bfdc4d85b3f",
              "lineNoIMV": 1,
              "svcOrdNo": "23625096180",
              "sequence": 10000,
              "itemNo": "20309828",
              "itemDesc": "LAMPLIG CHOPPING BOARD 46X53 BAMBOO AP CN",
              "quantity": 1,
              "weight": 2.91599999999999993,
              "volume": 0.00800000000000000017,
              "unitPrice": 249000,
              "NoOfPkgs": 1
            }
          ]
        },
        {
          "@odata.etag": "W/\"JzQ0O25WWjRDZS9iUmFsaGVXd3hBQkJYU1FPVFZUVFVXOWlublhBVVI5aENKVEE9MTswMDsn\"",
          "id": "b3005950-7fff-4e57-a12c-2c95408ff311",
          "shipRef": "23625076114",
          "storeNo": "236",
          "secondRef": "19040",
          "salesChannel": "ECOM",
          "orderDate": "2025-10-15",
          "productAmount": 90000,
          "productAmountVat": 99900,
          "itemCnt": 1,
          "pkgs": 1,
          "payStatus": "",
          "shipCust": "Shopee",
          "shipAddr": "2510155FNSHAR4 - Jl. H. R. Rasuna Said GAMA TOWER FL 8 No.2, Karet Kuningan Kecamatan Setiabudi, Kota Jakarta Selatan",
          "locationCode": "Kecamatan Setiabudi, Kota Jakarta Selatan",
          "shipPostal": "00000",
          "pickDateTime": "0001-01-01T00:00:00Z",
          "shipCity": "Jakarta Selatan",
          "shipPhone": "(+62)855******94",
          "shipEmail": "tokped_production@ikea.co.id",
          "orderCmt": "",
          "codTask": false,
          "codAmount": 0,
          "dfCreateDeliveryOrderServices": [
            {
              "@odata.etag": "W/\"JzQ0O0FYYXQvajIzUktSVW0rejVlSytaVzh6cTQvMTBtN3A1OXNyd05jQ2xmbk09MTswMDsn\"",
              "documentId": "b3005950-7fff-4e57-a12c-2c95408ff311",
              "docLineNo": 1,
              "svcOrdNo": "23625096162",
              "svcItemNo": "JNESHOPEE1",
              "svcName": "Home Delivery Shopee JNE",
              "serviceProviderName": "JNE SHOPEE",
              "date": "2025-10-15",
              "timeslot": "10:59:59 PM..11:59:59 PM",
              "status": "Service Provider Contacted",
              "gdval": 0,
              "prxOrg": 0,
              "prxVat": 0,
              "NoOfPkgs": 1,
              "svcCmt": ""
            }
          ],
          "dfCreateDeliveryOrderServiceItems": [
            {
              "@odata.etag": "W/\"JzQ0O3ZzNDgwT2tGeGFoMXVYWld1UHZDM1hZREpBbWp3Q1AxUVkyK3RHMGFSaHc9MTswMDsn\"",
              "documentId": "b3005950-7fff-4e57-a12c-2c95408ff311",
              "lineNoIMV": 1,
              "svcOrdNo": "23625096162",
              "sequence": 10000,
              "itemNo": "50290361",
              "itemDesc": "SKUBB N STOR CASE 44X55X19 WHITE AP CN",
              "quantity": 1,
              "weight": 0.63600000000000001,
              "volume": 0.00510000000000000037,
              "unitPrice": 99900,
              "NoOfPkgs": 1
            }
          ]
        }
      ]
    };
    setInputJson(JSON.stringify(sampleData, null, 2));
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON SVNo Converter</h1>
        <p>Extract service order numbers from complex JSON data</p>
      </header>
      
      <main className="main-content">
        <div className="container">
          <div className="input-section">
            <h2>Input JSON</h2>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste your JSON data here..."
              className="json-input"
            />
            <div className="button-group">
              <button onClick={loadSampleData} className="sample-btn">
                Load Sample Data
              </button>
              <button onClick={convertJson} className="convert-btn">
                Convert
              </button>
              <button onClick={clearAll} className="clear-btn">
                Clear All
              </button>
            </div>
          </div>

          <div className="output-section">
            <h2>Output JSON</h2>
            {error && <div className="error-message">{error}</div>}
            
            {Object.keys(separatedResults).length > 0 && (
              <div className="separated-results">
                <h3>Results Separated by Status</h3>
                <div className="download-controls">
                  <button onClick={downloadAllResults} className="download-all-btn">
                    Download All Results
                  </button>
                </div>
                {Object.entries(separatedResults).map(([status, items]) => (
                  <div key={status} className="status-group">
                    <div className="status-header">
                      <h4>{status} ({items.length} items)</h4>
                      <button onClick={() => downloadByStatus(status)} className="download-status-btn">
                        Download {status}
                      </button>
                    </div>
                    <textarea
                      value={JSON.stringify(items, null, 2)}
                      readOnly
                      className="status-output"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="all-results">
              <h3>All Results</h3>
              <textarea
                value={outputJson}
                readOnly
                placeholder="Converted JSON will appear here..."
                className="json-output"
              />
              {outputJson && (
                <div className="output-controls">
                  <button onClick={copyToClipboard} className="copy-btn">
                    Copy to Clipboard
                  </button>
                  <button onClick={() => downloadJson(JSON.parse(outputJson), 'svno-results-all.json')} className="download-btn">
                    Download All Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

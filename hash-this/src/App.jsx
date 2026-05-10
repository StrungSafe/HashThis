import { useState } from 'react'

import {
    swapEndianness,
    sha256,
    hash256,
    hexToBin,
    binToHex,
    cashAddressToLockingBytecode,
    utf8ToBin,
} from '@bitauth/libauth';

import './App.css'

function App() {
  const [source, setSource] = useState('');
  const [hex, setHex] = useState('');
  const [error, setError] = useState('');
  const onHash = async () => {
    setHex('');
    setError('');
    try {
      const uri = new URL(source);
      const response = await fetch(uri);
      if(response.status != 200) {
        throw new Error('Source provided a non success code: ' + response.status);
      }
      const hex = binToHex(sha256.hash(utf8ToBin(await response.text())));
      console.log('testing', hex);
      setHex(hex);
    } catch(error) {
      setError('There was a problem hashing your source');
      console.error(error);
    }
  };
  return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Hash Generator</h1>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Enter URL:</label>
            <input
              type="url"
              id="urlInput"
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(event) => setSource(event.target.value)}
            />
          </div>

          <button
            id="processBtn"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 mb-6"
            onClick={onHash}
          >
            Generate Hash
          </button>

          <div id="resultContainer" className={hex ? '' : "hidden"}>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Result:</h2>
            <div id="result" className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono break-words">{hex}</div>
          </div>

          <div id="errorContainer" className={error ? '' : "hidden"}>
            <h2 className="text-xl font-semibold text-red-600 mb-3">Error:</h2>
            <div id="error" className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
          </div>
        </div>
      </div>
  )
}

export default App

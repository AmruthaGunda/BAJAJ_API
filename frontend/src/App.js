import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = 'Your Roll Number';
  }, []);
  
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON
      const data = JSON.parse(jsonInput);

      // Make POST request to your Flask backend
      const res = await axios.post('http://localhost:5000/bfhl', { data: data.data });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or API error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <textarea
        placeholder='Enter JSON here'
        value={jsonInput}
        onChange={handleJsonChange}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <label htmlFor="options">Select what to display:</label>
          <select multiple={true} id="options" onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;

import "./App.css";
import React from "react";

const API_BASE = "https://us-central1-zero-coso.cloudfunctions.net/app";
function App() {
  const [rangers, setRangers] = React.useState();
  const [inputColor, setInputColor] = React.useState("");
  const getAllRangers = async () => {
    const response = await fetch(`${API_BASE}/rangers`)
    const data = await response.json();
    setRangers(data.rangers)
  };

  const handleInputChange = (event) => {
    setInputColor(event.target.value);
  }

  const handleCreateRanger = async () => {
    await fetch(`${API_BASE}/rangers`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "color": inputColor }),
    });
    setInputColor("")
  }

  return (
    <div className="App">
      <input
        className="ranger-input"
        type="text"
        value={inputColor}
        onChange={handleInputChange} />

      <button className="ranger-button red" onClick={handleCreateRanger}>
        Create Ranger
      </button>
      <button className="ranger-button" onClick={getAllRangers}>
        Refresh Rangers
      </button>
      <div className="rangers-container">
        {rangers &&
          rangers.map((ranger, i) => {
            return (
              <pre>
                {JSON.stringify(ranger, undefined, 2)}
              </pre>
            );
          })}
      </div>
    </div>
  );
}

export default App;

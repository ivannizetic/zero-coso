import "./App.css";
import React from "react";

const API_BASE = "https://us-central1-zero-coso.cloudfunctions.net/app";
function App() {
  const [rangers, setRangers] = React.useState();
  const getAllRangers = () => {
    fetch(`${API_BASE}/rangers`)
      .then((response) => response.json())
      .then((data) => setRangers(data.rangers));
  };

  return (
    <div className="App">
      <button className="ranger-button" onClick={getAllRangers}>
        Refresh Rangers
      </button>
      <div className="rangers-container"></div>
      {rangers &&
        rangers.map((ranger, i) => {
          return (
            <>
              <pre>
                <code className="ranger">{JSON.stringify(ranger)}</code>
              </pre>
              <br />
            </>
          );
        })}
    </div>
  );
}

export default App;

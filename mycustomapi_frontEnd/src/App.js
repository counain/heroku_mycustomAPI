import React, { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState({
    employees: [
      { name: "Shyam", email: "shyamjaiswal@gmail.com" },
      { name: "Bob", email: "bob32@gmail.com" },
      { name: "Jai", email: "jai87@gmail.com" },
    ],
  });
  const [defaultInput, setDefaultInput] = useState({
    employees: [
      { name: "Shyam", email: "shyamjaiswal@gmail.com" },
      { name: "Bob", email: "bob32@gmail.com" },
      { name: "Jai", email: "jai87@gmail.com" },
    ],
  });
  const [warning, setWarning] = useState();
  const [read, setRead] = useState(
    "http://localhost:5000/read/1997412f-79be-44df-a1af-4acaa533dabb"
  );
  const [update, setUpdate] = useState("Edit above response to generate Api");
  const [del, setDel] = useState("Edit above response to generate Api");
  const url = ["read", "update", "delete"];
  const supplyApi = (secretID) => {
    [setRead, setUpdate, setDel].map((item, index) =>
      item(`http://localhost:5000/${url[index]}/${secretID}`)
    );
  };
  const fetchResult = () => {
    try {
      if (
        JSON.stringify(defaultInput) !== JSON.stringify(userInput) &&
        typeof JSON.parse(userInput) == "object"
      ) {
        console.log("am trying to fetch data" + userInput);

        setWarning(" ");

        fetch("http://localhost:5000/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: userInput,
        })
          .then((response) => response.json())
          .then((json) => supplyApi(json.secretID))
          .catch((err) => console.log("Request Failed", err));
      } else {
        setWarning(" * Edit above data for new api");
      }
    } catch (e) {
      setWarning(" * check data with valid object");
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-light bg-light"
        style={{ paddingLeft: "10%" }}
      >
        <div>
          <h1 className="navbar-brand" href="#">
            custom api response
          </h1>
        </div>
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          backgroundColor: "rgb(169, 212, 212)",
        }}
      >
        <h1 className="text-6xl mb-two bold" style={{ paddingBottom: "20px" }}>
          Generate{"  {your own JSON}"}
        </h1>
        <p className="mb-one text-lg">
          Free to use online REST API for testing and prototyping
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          backgroundColor: "rgb(240, 243, 243)",
        }}
      >
        <h5 className="text-6xl mb-two bold" style={{ marginBottom: "15px" }}>
          Edit below reponse to generate Api
        </h5>
        <div className="form-floating">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Response
            </span>
            <textarea
              id="defaultInput"
              spellCheck="false"
              className="form-control"
              placeholder="//provide response data object here"
              id="floatingTextarea2"
              style={{ height: "130px" }}
              onChange={(e) => setUserInput(e.target.value)}
              value={JSON.stringify(userInput.employees)}
            ></textarea>
          </div>
          <button
            onClick={fetchResult}
            className="btn btn-primary"
            style={{ marginBottom: "15px", width: "130px" }}
          >
            Generate Api
          </button>
          <span id="warning" style={{ color: "red" }}>
            {warning}
          </span>
          <p style={{ marginBottom: "15px" }}>
            Run below api to get above response
          </p>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Read
            </span>
            <kbd id="read">
              fetch('{read}')
              <br /> &emsp;.then(response => response.json())
              <br /> &emsp;.then(json => console.log(json))
            </kbd>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Update
            </span>
            <kbd>
              {`fetch('${update}', {`}
              <br />
              &emsp;
              {`  method: 'PUT',`}
              <br />
              &emsp;
              {`  headers: { 'Content-Type': 'application/json'},`}
              <br />
              &emsp;
              {`  body: JSON.stringify({"name":"Shyam","email":"shyamjaiswal@gmail.com"}) `}
              <br />
              {`}).then(response => response.json()).then(json => console.log(json)) `}
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
/*
delete

<div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Delete
            </span>
            <kbd id="delete"> {del}</kbd>
          </div>*/

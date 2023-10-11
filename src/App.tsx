import logo from "./logo.gif";
import { NoteElement } from "./components/Note";
import "./App.css";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Login />
      <NoteElement />
    </div>
  );
}

export default App;

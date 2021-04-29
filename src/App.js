import logo from './logo.svg';
import './App.css';

function App({ widget }) {

  const contractAddress = widget.getAttribute("contract-address");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Exfil from <code>{contractAddress}</code> instantly for a fee.
        </p>
        <a
          className="App-link"
          href="http://exfil.finance"
          target="_blank"
          rel="noopener noreferrer"
        >
          Exfil Now
        </a>
      </header>
    </div>
  );
}

export default App;

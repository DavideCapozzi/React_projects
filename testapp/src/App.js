import logo from './logo.svg';
import './App.css';
import Navbar from './navbar';
import Button from './button';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Button />
    </div>
  );
}

export default App;

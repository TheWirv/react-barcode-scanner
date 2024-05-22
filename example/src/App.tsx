import BarcodeScanner from './components/BarcodeScanner';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BarcodeScanner
          onScan={(text) => {
            console.log('Successfully scanned this text:', text);
          }}
        />
      </header>
    </div>
  );
}

export default App;

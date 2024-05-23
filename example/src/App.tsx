import BarcodeScanner from './components/BarcodeScanner';
import './App.css';

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <BarcodeScanner
          onScan={(text) => {
            console.log('Successfully scanned this text:', text);
          }}
        />
      </div>
    </>
  );
}

export default App;

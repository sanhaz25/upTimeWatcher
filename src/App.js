import logo from './logo.svg';
import './App.css';
import urlsData from './backend/urls.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Your URL Monitoring Dashboard!
        </p>
        <div>
          <table cellPadding="20">
            <thead>
              <tr>
              <th>URL</th>
              <th>Status</th>
              <th>Response Time</th>
              <th>Last Checked</th>
              </tr>
            </thead>
            <tbody>
            {urlsData.map((oneUrl, idx) => (
              <tr key={idx}>
                <td>{oneUrl.caller}</td>
                <td>{oneUrl.status}</td>
                <td>{oneUrl.responseTime}</td>
                <td>{oneUrl.lastChecked}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;

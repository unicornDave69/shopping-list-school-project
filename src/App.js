import "./App.css";
import Overview from "./Overview/Overview";
import { UserProvider } from "./Providers/UserProvider";

function App() {
  return (
    <div className="App">
      <h1>WTBBTW</h1>
      <UserProvider>
        <Overview />
      </UserProvider>
    </div>
  );
}

export default App;

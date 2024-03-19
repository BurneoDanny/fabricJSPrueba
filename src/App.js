import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
function App() {

  return (
    <div className="App">
      <main>
        <header>
          <Navbar />
        </header>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

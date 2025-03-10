import { lazy } from "react";
import "./App.css";
const HomePage = lazy(() => import("@/pages/home/HomePage"));

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;

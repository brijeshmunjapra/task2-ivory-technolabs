import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import PlayerList from "./components/PlayerList";
// import PlayerInfo from "./components/PlayerInfo";
import { lazy, Suspense } from "react";

const PlayerList = lazy(() => import("./components/PlayerList"));
const PlayerInfo = lazy(()=>import("./components/PlayerInfo"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<PlayerList />} />
            <Route path="/:id" element={<PlayerInfo />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;

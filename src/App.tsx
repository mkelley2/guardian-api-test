import React from "react";
import { HomeScreen } from "./screens";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <HomeScreen />
    </div>
  );
};

export default App;

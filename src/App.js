import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home  from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App" style={{ fontFamily: 'arial' }}>
          <Route path="/" component={Home} exact/>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

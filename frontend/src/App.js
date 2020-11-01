import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import home from "./page/Home";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={home} />
      </Switch>
    </div>
  );
}

export default App;

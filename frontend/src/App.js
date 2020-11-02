import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import home from "./page/Home";
import main from "./page/Main"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/main" component={main} />
      </Switch>
    </div>
  );
}

export default App;

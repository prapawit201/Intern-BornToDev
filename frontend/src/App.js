import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import home from "./page/Home";
import login from "./page/Login";
import register from "./page/Register";
import main from "./page/Main";
import editData from "./component/DataEdit"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/register" component={register} />
        <Route exact path="/main" component={main} />
        <Route exact path="/edit/data/:dataId" component={editData} />
      </Switch>
    </div>
  );
}

export default App;

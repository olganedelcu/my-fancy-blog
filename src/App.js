// import logo from './logo.svg';
import './App.css';
import {
  BrowserRoute as Router,
  Switch,
  Route,
  Link
} from "react-route-dom";
import HomePage from './components/HomePage';
import postPage from "./components/PostPage";


function App() {

  return (
    <div className="App">
      <Route>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
        </Switch>
      </Route>
    </div>
  );
}

export default App;

import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/post/:postId">
            <PostPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

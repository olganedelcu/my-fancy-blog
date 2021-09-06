import styled from "styled-components";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PostPage from "./components/PostPage";
import CreatePost from "./components/CreatePost";
// REST API

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/post/:postId">
            <PostPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  //width: 100%;
  padding: 20px;
`;

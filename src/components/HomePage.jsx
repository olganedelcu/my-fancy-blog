import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// REST API
import styled from "styled-components";
import settings from "../settings";
import {CTAButton} from "./styled" 

function HomePage() {
  const [postList, setPostList] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");

  // in the scope of the component
  async function fetchPostList() {
    const response = await fetch(`${settings.apiUrl}/posts`); // GET
    const data = await response.json();
    setPostList(data); // update our state
  }

  useEffect(() => {
    fetchPostList(); // will be called when user land on the page
  }, []); // it will execute only on component did mount

  return (
    <Container>
      <h1>My fancy blog</h1>
      {postList.map((post) => {
        return (
          <StyledLink to={`/post/${post.id}`} key={post.id}>
            <PostTitle data-testid={`title-${post.id}`}>{post.title}</PostTitle>
            <PostDescription data-testid={`description-${post.id}`}>{post.description}</PostDescription>
          </StyledLink>
        );
      })}
      <Link to="/create-post">
        <CTAButton>Add Post</CTAButton>
      </Link>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  padding-right: 20px;
`


const PostDescription = styled.p`
  text-overflow: ellipsis;  
  width: 100%;  
  max-width: 100%;
  color: #808e9b;
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0px;
  white-space: nowrap;
  overflow: hidden;
`

const PostTitle = styled.p`
  color: #1e272e;
  color: #485460;
  text-transform: none;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0px;
  :hover{
    color: #1e272e;
  } 
`;

const StyledLink = styled(Link)`
  text-transform: none;
  text-decoration: none;
`

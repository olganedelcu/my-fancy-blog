import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import settings from "../settings";
import {CTAButton} from "./styled" 

export default () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [listComments, setListComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // in the scope of the component
  async function fetchSinglePost() {
    const response = await fetch(`${settings.apiUrl}/posts/${postId}`); // GET
    const data = await response.json();

    const responseComments = await fetch(
      `${settings.apiUrl}/posts/${postId}/comments`
    ); // GET
    const dataComments = await responseComments.json();

    setPostData(data); // update our state
    setListComments(dataComments); // update our state
  }

  async function createComment(commentTextInput) {
    // create a post/article
    const response = await fetch(`${settings.apiUrl}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: commentTextInput,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // refetch and refresh the UI
    fetchSinglePost();
  }

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <Container>
      <PostTitle>{postData && postData.title}</PostTitle>
      <p>{postData && postData.description}</p>
      <CommentHeading>Comments:</CommentHeading>
      <CommentContainer>
        {listComments.map((comm) => {
          return <CommentBody>{comm.body}</CommentBody>;
        })}
      </CommentContainer>
      <h3>Leave a comment:</h3>
      <CommentAddContainer>
        <CommentTextArea
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        ></CommentTextArea>
        <CTAButton
          onClick={() => {
            createComment(commentText);
            setCommentText(""); // clean the comment area
          }}
        >
          {" "}
          Comment
        </CTAButton>
      </CommentAddContainer>
      <Link to="/">Go Back Home</Link>
    </Container>
  );
};

const PostTitle = styled.h2`
    margin-bottom: 0px;
`

const CommentHeading = styled.h2`
    margin-bottom: 0px;
`

const CommentBody = styled.p`
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-style: italic;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;



const CommentAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentTextArea = styled.textarea`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;
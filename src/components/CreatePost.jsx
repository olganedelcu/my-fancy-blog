import { useState } from "react";
import { Link } from "react-router-dom";
import settings from "../settings";
import styled from "styled-components";
import {CTAButton} from "./styled" 

export default () => {
  const [isSuccess, setIsSuccess] = useState(false);

  async function createArticle(articleData) {
    // create a post/article
    const response = await fetch(`${settings.apiUrl}/posts`, {
      method: "POST",
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSuccess(true);
  }

  return (
    <div>
      <h1>Create a new post:</h1>
      {!isSuccess ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newPost = {
              title: event.target.title.value,
              description: event.target.description.value,
            };
            createArticle(newPost);
          }}
        >
          <FieldContainer>
            <FormLabel>Title:</FormLabel>
            <Input name="title"></Input>
          </FieldContainer>
          <FieldContainer>
            <FormLabel>Description:</FormLabel>
            <TextArea name="description"></TextArea>
          </FieldContainer>
          <CTAButton type="submit">Submit</CTAButton>
        </form>
      ) : (
        <div>Post was created!</div>
      )}
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

const FormLabel = styled.label``;

const Input = styled.input`
    width: 100%;
`;

const TextArea = styled.textarea`
        width: 100%;
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    margin-top: 10px;
`;

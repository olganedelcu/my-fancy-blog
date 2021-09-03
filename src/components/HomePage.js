import { useState, useEffect } from 'react';
import {
  Link
} from "react-router-dom";

const apiUrl = "http://localhost:3004/posts"

function HomePage() {
  const [postList, setPostList] = useState([]) // we have an empty pagge then it fetch the post because the useEffect function
  const [newPostTitle, setNewPostTitle] = useState("") 

  // in the scope of the component
  async function fetchPostList() {
    const response = await fetch(apiUrl) //GET
    const data = await response.json()
    setPostList(data) // update our State
  }

  async function createArticle(articleData) {
    //cerate a post/article
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    fetchPostList()
  }


  useEffect(() => {
    fetchPostList() // will be called when user land on the page
  }, []) // it will execute only on component did mount

  return (
    <div className="App">
      {postList.map(post => {
        return <Link key={post.id} to={`/post/${post.id}`}>
          <p>{post.title}</p>
        </Link>
      })}
      <input value={newPostTitle} onChange={(event) => (setNewPostTitle(event.target.value))}></input>
      <button onClick ={() => {
        createArticle({ "title": newPostTitle, "author": "user"})
        setNewPostTitle("") //clear the input so the user can start again
      }}>Create a fake post</button>
    </div>
  );
}

export default HomePage;

import {
    useParams
  } from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:30004/posts"

export default () => {
    const {postId} = useParams()
    const [postData, setPostData] =useState(null)


    // in the scope of the component
    async function fetchSinglePost() {
        const response = await fetch(`${apiUrl}/${postId}`)
        const data = await response.json()
        setPostData(data)
    }

    useEffect(() => {
        fetchSinglePost()
    }, [])


    return <div>
        <h2>{postData && postData.title}</h2>
        <p>{postData && postData.description}</p>
    </div>
}
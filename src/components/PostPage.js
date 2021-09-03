import {
    useParams,
    Link
} from "react-router-dom";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:3004/posts"

export default () => {
    const { postId } = useParams()
    const [postData, setPostData] = useState(null)
    const [listComments, setListComments] = useState([])
    const [commentText, setCommentText] = useState("")


    // in the scope of the component
    async function fetchSinglePost() {
        const response = await fetch(`${apiUrl}/${postId}`)
        const data = await response.json()

        const responseComments = await fetch(`${apiUrl}/${postId}/comments`)
        const dataComments = await responseComments.json()

        setListComments(dataComments) // update our State
        setPostData(data)
    }

    useEffect(() => {
        fetchSinglePost() // will be called when user land on the page
    }, [])

    async function createComment(commentTextInput) {

        const response = await fetch(apiUrl, {
            method: "Post",
            body: JSON.stringify({
                "body": commentTextInput,
                "postId": postId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }


    return <div>
        <h2>{postData && postData.title}</h2>
        <p>{postData && postData.description}</p>
        <h2>Comments: </h2>
        <div>
            {listComments.map(comm => {
                return <p>{comm.body}</p>
            })}
        </div>
        <textarea value={commentText} onChange={(e) => {
            setCommentText(e.target.value)
        }}></textarea>
        <button onClick={() => {
            createComment(commentText);
            setCommentText("")
        }}>Comment</button>
        <Link to="/">Go Back Home</Link>
    </div>
}
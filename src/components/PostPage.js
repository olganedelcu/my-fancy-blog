import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:3004/posts"

export default () => {
    const { postId } = useParams()
    const [postData, setPostData] = useState(null)
  


    // in the scope of the component
    async function fetchSinglePost() {
        const response = await fetch(`${apiUrl}/${postId}`)
        const data = await response.json()

        setPostData(data)
    }

    useEffect(() => {
        fetchSinglePost() // will be called when user land on the page
    }, [])

  


    return <div>
        <h2>{postData && postData.title}</h2>
        <p>{postData && postData.description}</p>
   
       

        <Link to="/">Go Back Home</Link>
    </div>
}
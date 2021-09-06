import { useState} from 'react'
const apiUrl = "http://localhost:3004/posts"

export default () => {
    const [isSuccess, setIsSuccess] =useState(false)

    async function createArticle(articleData) {
        //cerate a post/article
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify(articleData),
          headers: {
            "Content-Type": "application/json"
          }
        })
        setIsSuccess(true)
    }

        
    return <div>
        <h1>Create a new post :</h1>
        <form onSubmit={(event) => {
            const newPost = {
                title: event.target.title.value,
                description: event.target.description.value,
            }
            createArticle(newPost)
        }}>
            <div>
                <label>Title:</label>
                <input name="title"></input>
            </div>
            <div>
                <label>Description:</label>
                <textaera name="description"></textaera>

            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
}
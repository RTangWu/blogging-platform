const getAll = (id)=> {
    return fetch("http://localhost:3333/articles/" +id +"/comments")
    .then((response) =>{
        if(response.status === 200){
            return response.json();
        }else{
            throw"Something went wrong"
        }
    })
    .then((resJson) =>{
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}
 const addComment =(id, comment_text)=>{
    return fetch("http://localhost:3333/articles/" +id +"/comments",
    {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "comment_text":comment_text
        })
    })
    .then((response)=>{
        if(response.status === 201){
            return response.json();
        }else if(response.status === 400){
            throw"Bad Request"
        }else{
            throw"Something went wrong"
        }
    })
    .then((resJson) =>{
        localStorage.setItem("comment_id", resJson.comment_id)
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })
 }
 const deleteComment =(id)=>{
    return fetch("http://localhost:3333/comments/" +id,
    {
        method:"DELETE",
        headers:{
            "Content-type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
            
        },
        
    })
        .then((response) =>{
        if(response.status === 200){

            return;
            
        }else{
            throw"Something went wrong"
        }
    })

        .catch((error)=>{
            console.log("Err", error)
            return Promise.reject(error)
        })

}

export const commentService ={
    getAll,
    addComment,
    deleteComment
}
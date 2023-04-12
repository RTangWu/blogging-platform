const getAll = ()=> {
    return fetch("http://localhost:3333/articles")
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
const getOne = (id)=> {
    return fetch("http://localhost:3333/articles/" + id)
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
const deleteArticle =(id)=>{
    return fetch("http://localhost:3333/articles/" + id,
    {
        method:"DELETE",
        headers:{
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
const addArticle =(title, article_text,author)=>{
    return fetch("http://localhost:3333/articles/",
    {
        method: "POST",
        headers:{
            "Content-type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")

        },
        body: JSON.stringify({
            "title":title,
            "article_text":article_text,
            "author":author
        })
    })
    .then((response)=>{
        if(response.status === 201){

            return ;
        }else if(response.status === 400){
            throw"Bad Request"
        }else{
            throw"Something went wrong"
        }
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })
 }
 const updateArticle =(id, title, article_text,author)=>{

    return fetch("http://localhost:3333/articles/" + id,
    {
        method:"PATCH",
        headers:{
            "Content-type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
            
        },
        body: JSON.stringify({
            "title":title,
            "article_text":article_text,
            "author":author
        })
        
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


export const articleService ={
    getAll,
    getOne,
    deleteArticle,
    addArticle,
    updateArticle
}
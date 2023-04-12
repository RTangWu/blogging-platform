const comments =require("../models/comments.models");
const Joi = require("joi");


const getAll = (req, res) => {
   let article_id = parseInt(req.params.article_id);

   comments.getArticleId(article_id, (err,results)=>{
    if(err === 404) return res.sendStatus(404)
    if(err)return res.sendStatus(500)

        comments.gettAllComments(article_id,(err, num_rows,results)=>{
            
            if(err) return res.sendStatus(500);
            return res.status(200).send(results);
    
            
        })


    })
       

    
    
    
}
const create = (req, res) => {
    let article_id =parseInt(req.params.article_id);
    
    comments.getArticleId(article_id, (err,results)=>{
        if(err === 404) return res.sendStatus(404)
        if(err)return res.sendStatus(500)

        const schema = Joi.object({
            "comment_text": Joi.string().required(),
        })
        const{ error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        let comment = Object.assign({}, req.body);
        
        comments.addNewComment(article_id,comment,(err,id)=>{
        if(err)return res.sendStatus(500);
        return res.status(201).send({comment_id: id})
        })

    })    
    
    
}

const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);
    comments.getSingleComment(comment_id, (err,result)=>{
        if(err === 404) return res.sendStatus(404)
        if(err)return res.sendStatus(500)
        
        comments.deleteComment(comment_id,(err)=>{
        if(err === 404) return res.sendStatus(404);
        if (err) return res.status(500);
        
        })
        return res.sendStatus(200)

   })
  
}



module.exports ={

  
    getAll: getAll,
    create: create,
    deleteComment: deleteComment


    
}
const db = require("../../database");
const Filter = require("bad-words");
const getArticleId = (id, done)=>{
    const sql = 'SELECT * FROM articles WHERE article_id=?'

    db.get(sql, [id], (err, row)=>{
        if(err) return done(err)
        if(!row) return done(404)

        return done(null,{
            article_id: row.article_id
        });
    })
}

const gettAllComments = (id,done) =>{
    const results =[];
    const sql = 'SELECT * FROM comments WHERE article_id=?'
    let filter =new Filter({placeHolder: 'x'});
    db.each(sql,[id],(err, row) =>{
            if(err) console.log("Something went wrong: " + err);

            results.push({
                comment_id: row.comment_id,
                date_published: new Date(row.date_published).toLocaleDateString(),
                comment_text: filter.clean(row.comment_text)
            });
        },
        (err, num_rows)=>{
            return done(err, num_rows, results);
        }
    )
}



const addNewComment =(article_id,comment, done)=> {
    let date = Date.now();

    const sql = 'INSERT INTO comments (comment_text, article_id ,date_published) VALUES (?,?,?)';
    let values = [comment.comment_text, article_id,date];


    db.run(
        sql,
        values,
        function(err){
            if(err) return done (err, null);
            
            return done(null, this.lastID);
        }
    )
}




const getSingleComment = (id, done)=>{
    const sql = 'SELECT * FROM comments WHERE comment_id=?'

    db.get(sql, [id], (err, row)=>{
        if(err) return done(err)
        if(!row) return done(404)

        return done(null,{
            comment_id: row.comment_id,
            comment_text: row.comment_text
        })
    })
}

const deleteComment=(id,done)=>{
    const sql ='DELETE FROM comments WHERE comment_id=?'
    db.run(sql, [id], (err)=>{
        if(err) return done(err)
        
        
        return done(err)
    })
}


module.exports ={
    gettAllComments: gettAllComments,
    addNewComment: addNewComment,
    deleteComment: deleteComment,
    getSingleComment: getSingleComment,
    getArticleId:getArticleId
    
}
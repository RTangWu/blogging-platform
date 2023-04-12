const users =require("../models/users.models");
const Joi = require("joi")

const getAll = (req, res) => {
    users.gettAllUsers((err, num_rows, results)=>{
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
    
}

const create = (req, res) => {
    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(8).max(12)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'number')
        .required(),
    })
    
    const{ error } = schema.validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    let user = Object.assign({}, req.body);
    
    users.addNewUser(user,(err,id)=>{
        if(err)return res.sendStatus(500);

        return res.status(201).send({user_id: id})
    })
    
}

const login = (req, res) => {
    const schema = Joi.object({

        "email": Joi.string().email().required(),
        "password": Joi.string().required()
     
    })
    
    const{ error } = schema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).send(error.details[0].message);

    }else{
        //let user = Object.assign({}, req.body);
        users.authenticateUser(req.body.email, req.body.password, (err, id)=>{
            if(err === 404) {
                console.log(err);
                return res.status(400).send("invalid email/password supplied")}
            if(err) {
                console.log(err);
                return res.sendStatus(500)}
        
            users.getToken(id,(err, token) =>{
                
                if (err) return res.sendStstus(500)
                
                if(token){
                    return res.status(200).send({user_id: id, session_token: token})
        
                }else{
                    users.setToken(id, (err, token)=>{
                        if(err) return res.sendStatus(500)
                        return res.status(200).send({user_id: id, session_token: token})
                    })
                }
            })
        })

    }   

    
    

    
}

const logout = (req, res) => {
    let session_token =
    req.get('X-Authorization');
    
    users.removeToken(session_token,(err)=>{
        if (err) return res.status(500);
        
    });
    return res.sendStatus(200)
   
}



module.exports ={

    create: create,
    login:login,
    logout:logout,
    getAll: getAll


    
}
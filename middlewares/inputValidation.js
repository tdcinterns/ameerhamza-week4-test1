import Joi from 'joi';

// task input validation
const taskvalidation=(req,res,next)=>{

    const schema={
        title: Joi.string().required(),
        description: Joi.string().min(10)
    };


    const result=Joi.validate(req.body,schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    next();

}

// login input validation
const loginValidation=(req,res,next)=>{

    const schema={
        email: Joi.string().required(),
        password: Joi.string().required()
    };


    const result=Joi.validate(req.body,schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    next();

}

// signup input validation
const signupValidation=(req,res,next)=>{

    const schema={
        name:Joi.string().min(4).required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    };


    const result=Joi.validate(req.body,schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    next();

}

export  {taskvalidation,loginValidation,signupValidation};
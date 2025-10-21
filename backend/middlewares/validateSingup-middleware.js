const { ZodError } = require("zod");


const validate = (Schema) => async (req, res,next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        next();
        
    } catch (error) 
    {
        const status = 422;
        const extraDetails =  error.issues[0].message || "Validation failed";
        const message = "fill the input properly";
      
    //   const messages = error.issues[0].message || "Validation failed";
    const errors = {
        status,
        message,   
        extraDetails,

    }
    
    //   res.status(400).json({msg: errors});
    next(errors);
    

}
}

module.exports = validate;
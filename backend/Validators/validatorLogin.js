
const Z = require("zod");
const LoginSchema = Z .object({
    email:
    Z.string({ required_error:"Email is required" })
    .trim()
    .email({message:"Invalid email address"})
    .min(3, {message: "Email must be at lest  of 3 characters."})
    .max(255, {message:"Email must not be more than 255 characters"}),
    password:
    Z.string({required_error:"Password is required" })
    .trim()
    .min(7, {message: "Password must be at lest  of 6 characters."})
    .max(1024, {message:"Password must not be more than 1024 characters"}),
});

module.exports =  LoginSchema;
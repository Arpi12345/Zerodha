const { ZodError } = require("zod");

const validate1 = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const status = 422;
      const extraDetails = error.issues.map(issue => issue.message).join(", ");
      const message = "Fill the input properly";

      const errors = {
        status,
        message,
        extraDetails,
      };

      return res.status(status).json(errors); // ✅ single response
    }

    // For other unexpected errors
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = validate1;

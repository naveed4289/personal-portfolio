const{Schema}=require("mongoose");

const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body);
        req.body = parseBody;
        return next();
    } catch (err) {
        const status = 422;
        const message="Fill the input Properly"
        const extraDetails = err.issues ? err.issues.map((curElem) => curElem.message) : [];

        res.status(status).json({
            status,
            message,
            extraDetails
        });
    }
};

module.exports=validate;
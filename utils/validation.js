const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body; 

    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("❌ Please enter a strong password");
    }

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("❌ Please enter a valid email address");
    }

    if (!firstName || !lastName) {
        throw new Error("❌ First name and last name are required");
    }
};

module.exports = {
    validateSignupData,
};

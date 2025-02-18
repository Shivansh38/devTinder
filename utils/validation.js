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

const validateEditProfileData = (req) => {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };
module.exports = {
    validateSignupData,
    validateEditProfileData
};

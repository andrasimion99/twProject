const bcrypt = require("bcryptjs");

module.exports = (schema) => {
  schema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
      try {
        user.password = await bcrypt.hash(user.password, 8);
      } catch (error) {
        console.log(error);
        throw new Error("Problem while crypting");
      }
    }
    next();
  });
};

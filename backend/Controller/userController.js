const UserModel = require("../Model/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await UserModel.find({ email });

    if (userExist) {
      res.status(400).send({ message: "Email already Exists" });
    }
    const userCreated = await User.create({ name, email, password });
    res.status(200).send({
      msg: "registration Successfully",
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", error });
  }
};

module.exports = { register };

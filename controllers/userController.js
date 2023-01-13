const userController = {
  async getUser(req, res, next) {
    console.log("hello user..");
    res.json("done")
  },
};

export default userController;

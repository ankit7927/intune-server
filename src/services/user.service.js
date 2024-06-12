const userModel = require("../models/user.model");
const { errorGen } = require("../utilities/common.utils");

const userService = {};

userService.getProfile = async (userId) => {
    const data = await userModel.findOne({ _id: userId })
        .select("name username").lean();
    return data;
}

userService.updateProfile = async (userId, newName, newUsername) => {
    const update = await userModel.findOneAndUpdate({ _id: userId },
        { "$set": { name: newName, username: newUsername } }, { new: true })
        .select("name username").lean().exec()

    if (update) return update;
    else errorGen("wrong data provided", 500);
}

// TODO impl. update user profile image, email and password

userService.isUsernameAvailable = async (username) => {
    return await userModel.find({ username: { "$regex": username } }).select("name username").lean().exec()
}



module.exports = userService;
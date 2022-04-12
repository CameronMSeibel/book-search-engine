const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
    Query: {
        me: async (parent, args, {user}) => {
            if(user){
                return User.findById(user._id);
            }
            throw new AuthenticationError("You must log in!");
        }
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email: email });
            if(!user){
              throw new Error("Can't find this user");
            }
            const validPassword = await user.isCorrectPassword(password);
            if(!validPassword){
                throw new Error("Wrong password!");
            }
            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            if(!user) {
                throw new Error("Something bad happened");
            }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, args, {user}) => {
            if(user){
                try{
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: user._id },
                        { $addToSet: { savedBooks: args } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                }catch(error){
                    return error;
                }
            }
            throw new AuthenticationError("You must log in!");
        },
        removeBook: async (parent, {bookId}, {user}) => {
            if(user){
                try{
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: user._id },
                        { $pull: { savedBooks: { bookId: bookId } } },
                        { new: true }
                    );
                    return updatedUser;
                }catch(error){
                    return error;
                }
            }
            throw new AuthenticationError("You must log in!");
        }
    }
}
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

    }
}
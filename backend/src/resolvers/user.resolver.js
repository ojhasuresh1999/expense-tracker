import bcrypt from "bcryptjs";

import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);

        const newUser = new User({
          username,
          name,
          password: await bcrypt.hash(password, salt),
          gender,
          profilePicture:
            gender == "male"
              ? `https://avatar.iran.liara.run/public/boy?username=${username}`
              : `https://avatar.iran.liara.run/public/girl?username=${username}`,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (error) {
        console.log("🚀 ~ signUp: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },

    logIn: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        if (!username || !password) {
          throw new Error("All fields are required");
        }

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.logIn(user);

        return user;
      } catch (error) {
        console.log("🚀 ~ signUp: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },

    logOut: async (_, __, context) => {
      try {
        await context.logOut();
        req.session.destroy((err) => {
          if (err) throw new Error(err);
        });
        res.clearCookie("connect.sid");
        return { message: "Logged out successfully!!!!" };
      } catch (error) {
        console.log("🚀 ~ logOut: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
  },
  Query: {
    // users: (_, { req, res }) => {
    //   return users;
    // },
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.log("🚀 ~ authUser: ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },

    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.log("🚀 ~ user:async ~ error:", error);
        throw new Error(error.message || "An error occurred");
      }
    },
  },
};

export default userResolver;

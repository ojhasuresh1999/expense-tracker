import passport from "passport";
import bcrypt from "bcryptjs";

import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("🚀 ~ passport.serializeUser ~ user:", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("🚀 ~ passport.deserializeUser ~ id:", id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      console.log("🚀 ~ passport.deserializeUser ~ error:", error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error("Invalid username or password");

        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Invalid username or password");

        return done(null, user);
      } catch (error) {
        console.log("🚀 ~ newGraphQLLocalStrategy ~ error:", error);
        return done(error);
      }
    })
  );
};

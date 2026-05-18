import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../../../config/env.js";
import type { UserLogin, UserRegister, UserVerifyEmail } from "./auth.validation.js";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

const login = async (payload: UserLogin) => {
  
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isVerified) {
    throw new Error("Email is not verified");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });

  const { password, ...userWithoutSecrets } = user;

  return {
    user: userWithoutSecrets,
    accessToken,
  };
};

const register = async (payload: UserRegister) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expireAt = new Date(Date.now() + 15 * 60 * 1000); 

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      age: payload.age ?? null,
      verificationCode: {
        create: {
          code: code,
          expireAt: expireAt,
        },
      },
    },
  });

  try {
    await sendVerificationEmail(user.email, code);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }

  
  return user;
};

const verifyEmail = async (payload: UserVerifyEmail) => {
 
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,           // pore use korar jonno
      isVerified: true,   // validation er jonno dorkar
      verificationCode: { // Related model theke data anchi select diye
        select: {
          code: true,
          expireAt: true
        }
      }
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  if (!user.verificationCode || user.verificationCode.code !== payload.code) {
    throw new Error("Invalid verification code");
  }

  const currentTime = new Date();
  if (user.verificationCode.expireAt && currentTime > user.verificationCode.expireAt) {
    throw new Error("verification code has expired");
  }

  const updateduser = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      isVerified: true,
      verificationCode: {
        delete: true,
      },
    },
    // Ekhane o select use kore sudhu id return kora holo performance er jonno
    select: {
      id: true
    }
  });

  return {
    message: "Email verified successfully",
    userId: updateduser.id,
  };
};

const getAllUsers = async () => {
  // Sob user anar somoy o password bad diye select korte paren
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
      userType: true,
      create_at: true,
    }
  });
  return allUsers;
};

export const Authservice = {
  login,
  register,
  getAllUsers,
  verifyEmail,
};
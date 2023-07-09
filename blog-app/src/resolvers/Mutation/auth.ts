import { User } from '@prisma/client';
import { Context } from '../..';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../keys';

interface SignupArgs {
  email: string;
  name: string;
  bio: string;
  password: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    parent: any,
    args: SignupArgs,
    context: Context
  ): Promise<UserPayload> => {
    const { prisma } = context;
    const { email, name, bio, password } = args;
    // validate the inputs
    const isEmail = validator.isEmail(email);
    if (!isEmail)
      return {
        userErrors: [{ message: 'invalid email' }],
        token: null,
      };
    const isValidPassword = validator.isLength(password, { min: 5 });
    if (!isValidPassword)
      return {
        userErrors: [{ message: 'invalid password' }],
        token: null,
      };
    if (!name || !bio)
      return {
        userErrors: [{ message: 'invalid name or bio' }],
        token: null,
      };

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    // create a jwt token
    const jwtToken = await jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: 3600000,
      }
    );
    return {
      userErrors: [],
      token: jwtToken,
    };
  },
};
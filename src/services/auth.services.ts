import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

export const registerAdmin = async (email: string, password: string) => {
  console.log(email, password)
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new User({ email, password: hashed });
  await user.save();
  return user;
};

export const loginAdmin = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { token, user: { id: user._id, email: user.email } };
};

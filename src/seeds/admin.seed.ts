import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { connectDB } from '../db/mongo';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS);

    // Créer l'utilisateur admin
    const adminUser = new User({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log(`Admin user created successfully: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();

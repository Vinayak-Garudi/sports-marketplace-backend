const User = require('./user.model');
const { generateToken } = require('../../config/jwt');

class AuthService {
  // Register a new user
  async register(userData) {
    const { username, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('User already exists with this username');
    }

    // Create user
    const user = await User.create({
      username,
      password,
      role,
    });

    // Generate token
    const token = generateToken({ id: user._id });

    return {
      user,
      token,
    };
  }

  // Login user
  async login(username, password) {
    const users = await User.find().lean();
    if (!users.length) {
      return await this.register({ username, password, role: 'admin' });
    }

    // Check if user exists and get password
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      throw new Error('Invalid username');
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Generate token
    const token = generateToken({ id: user._id });

    return {
      user,
      token,
    };
  }

  // Get user profile
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    const allowedFields = ['name', 'email'];
    const filteredData = {};

    // Filter allowed fields
    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key];
      }
    });

    const user = await User.findByIdAndUpdate(userId, filteredData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    // Check current password
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}

module.exports = new AuthService();

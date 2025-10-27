const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
      enum: {
        values: ['new', 'like-new', 'good', 'fair', 'worn'],
        message: 'Condition must be one of: new, like-new, good, fair, worn',
      },
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    sellerName: {
      type: String,
      required: [true, 'Seller name is required'],
      trim: true,
    },
    sellerEmail: {
      type: String,
      required: [true, 'Seller email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    sellerPhone: {
      type: String,
      required: [true, 'Seller phone is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: 'Cannot upload more than 10 images',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
); // Indexes for better query performance
equipmentSchema.index({ createdAt: -1 });

// Virtual fields
// Example: Full name virtual field
// equipmentSchema.virtual('fullInfo').get(function() {
//   return `${this.name} - ${this.description}`;
// });

// Pre-save middleware
equipmentSchema.pre('save', function (next) {
  // Add any pre-save logic here
  next();
});

// Static methods
equipmentSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Instance methods
equipmentSchema.methods.deactivate = function () {
  this.isActive = false;
  return this.save();
};

module.exports = mongoose.model('Equipment', equipmentSchema);

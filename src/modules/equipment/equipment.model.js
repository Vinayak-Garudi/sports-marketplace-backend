const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
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

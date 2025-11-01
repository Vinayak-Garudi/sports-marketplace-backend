const Equipment = require('./equipment.model');

class EquipmentService {
  // Get all equipments with pagination
  async getAll(options = {}) {
    const {
      page = options.page || 1,
      limit = options.limit || 10,
      sort = options.sort || '-createdAt',
      filter = options.filter || {},
      populate = options.populate || '',
    } = options;

    const skip = (page - 1) * limit;

    // Build query
    let query = Equipment.find(filter);

    if (populate) {
      query = query.populate(populate);
    }

    // Execute query with pagination
    const [items, total] = await Promise.all([
      query.sort(sort).skip(skip).limit(parseInt(limit)),
      Equipment.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get equipment by ID
  async getById(id, populate = '') {
    let query = Equipment.findById(id);

    if (populate) {
      query = query.populate(populate);
    }

    const item = await query;
    if (!item) {
      throw new Error('Equipment not found');
    }

    return item;
  }

  // Create new equipment
  async create(data) {
    const item = await Equipment.create(data);
    console.log('Created Equipment:', item);
    return item;
  }

  // Update equipment
  async update(id, data) {
    const item = await Equipment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw new Error('Equipment not found');
    }

    return item;
  }

  // Delete equipment
  async delete(id) {
    const item = await Equipment.findByIdAndDelete(id);

    if (!item) {
      throw new Error('Equipment not found');
    }

    return item;
  }

  // Search equipments
  async search(searchTerm, options = {}) {
    const searchFilter = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { sellerName: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } },
      ],
      ...options.filter,
    };

    const results = await this.getAll({ ...options, filter: searchFilter });
    return results;
  }

  // Get equipment statistics
  async getStats() {
    const [total, active, inactive] = await Promise.all([
      Equipment.countDocuments(),
      Equipment.countDocuments({ isActive: true }),
      Equipment.countDocuments({ isActive: false }),
    ]);

    return {
      total,
      active,
      inactive,
      recentlyCreated: await Equipment.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
    };
  }
}

module.exports = new EquipmentService();

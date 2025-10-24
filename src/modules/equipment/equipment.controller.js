const equipmentService = require('./equipment.service');
const asyncHandler = require('../../utils/asyncHandler');

class EquipmentController {
  // Get all equipments
  getAll = asyncHandler(async (req, res) => {
    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort,
      populate: req.query.populate,
      filter: {},
    };

    // Add filter conditions based on query parameters
    if (req.query.isActive !== undefined) {
      options.filter.isActive = req.query.isActive === 'true';
    }

    const result = await equipmentService.getAll(options);

    res.status(200).json({
      success: true,
      message: 'Equipments retrieved successfully',
      data: result.items,
      pagination: result.pagination,
    });
  });

  // Get equipment by ID
  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const populate = req.query.populate || '';
    
    const equipment = await equipmentService.getById(id, populate);

    res.status(200).json({
      success: true,
      message: 'Equipment retrieved successfully',
      data: equipment,
    });
  });

  // Create new equipment
  create = asyncHandler(async (req, res) => {
    const equipment = await equipmentService.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Equipment created successfully',
      data: equipment,
    });
  });

  // Update equipment
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const equipment = await equipmentService.update(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment,
    });
  });

  // Delete equipment
  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await equipmentService.delete(id);

    res.status(200).json({
      success: true,
      message: 'Equipment deleted successfully',
    });
  });

  // Deactivate equipment (soft delete)
  deactivate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const equipment = await equipmentService.deactivate(id);

    res.status(200).json({
      success: true,
      message: 'Equipment deactivated successfully',
      data: equipment,
    });
  });

  // Search equipments
  search = asyncHandler(async (req, res) => {
    const { q: searchTerm } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required',
      });
    }

    const options = {
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort,
      populate: req.query.populate,
      filter: {},
    };

    const result = await equipmentService.search(searchTerm, options);

    res.status(200).json({
      success: true,
      message: 'Equipments search results',
      data: result.items,
      pagination: result.pagination,
    });
  });

  // Get equipment statistics
  getStats = asyncHandler(async (req, res) => {
    const stats = await equipmentService.getStats();

    res.status(200).json({
      success: true,
      message: 'Equipment statistics retrieved successfully',
      data: stats,
    });
  });
}

module.exports = new EquipmentController();
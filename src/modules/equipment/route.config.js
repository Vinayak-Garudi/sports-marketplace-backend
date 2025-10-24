// Route configuration for the equipment module
module.exports = {
  // Custom route path - change this to customize your routes
  path: '/api/equipments', // Smart plural form. Change to '/api/equipment' for singular
  
  // Enable or disable this module
  enabled: true,
  
  // Optional: Add middleware specific to this module
  // middleware: [
  //   require('../../middleware/auth'),
  //   // Add other middleware as needed
  // ],
  
  // Optional: Route description for documentation
  description: 'Equipment management endpoints',
  
  // Optional: API version
  version: 'v1',
  
  // Optional: Rate limiting specific to this module
  // rateLimit: {
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 50 // limit each IP to 50 requests per windowMs for this module
  // }
};

/*
 * ROUTE CUSTOMIZATION EXAMPLES:
 * 
 * 1. Change route path:
 *    path: '/api/custom-equipment'
 * 
 * 2. Disable module temporarily:
 *    enabled: false
 * 
 * 3. Add authentication to all routes in this module:
 *    middleware: [require('../../middleware/auth')]
 * 
 * 4. Version your API:
 *    path: '/api/v2/equipments'
 * 
 * 5. Custom rate limiting:
 *    rateLimit: { windowMs: 60000, max: 10 }
 */
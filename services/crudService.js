/**
 * Generic CRUD Service to eliminate redundant code
 * Provides standard database operations for any model
 */

class CRUDService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Fetch all documents with optional filtering and limiting
   */
  async getAll(filter = {}, limit = null) {
    try {
      let query = this.model.find(filter);
      if (limit) {
        query = query.limit(limit);
      }
      return await query.exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error fetching records",
        error: error.message
      };
    }
  }

  /**
   * Fetch a single document by ID
   */
  async getById(id) {
    try {
      return await this.model.findById(id).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error fetching record",
        error: error.message
      };
    }
  }

  /**
   * Fetch documents with custom filter
   */
  async find(filter = {}) {
    try {
      return await this.model.find(filter).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error fetching records",
        error: error.message
      };
    }
  }

  /**
   * Create a new document
   */
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw {
        status: error.code === 11000 ? 400 : 500,
        message: error.code === 11000 ? "Duplicate entry" : "Error creating record",
        error: error.message
      };
    }
  }

  /**
   * Update a document by ID
   */
  async updateById(id, updateData) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error updating record",
        error: error.message
      };
    }
  }

  /**
   * Delete a document by ID
   */
  async deleteById(id) {
    try {
      return await this.model.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error deleting record",
        error: error.message
      };
    }
  }

  /**
   * Delete multiple documents by filter
   */
  async deleteMany(filter) {
    try {
      return await this.model.deleteMany(filter).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error deleting records",
        error: error.message
      };
    }
  }

  /**
   * Count documents
   */
  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error counting records",
        error: error.message
      };
    }
  }

  /**
   * Aggregate operation
   */
  async aggregate(pipeline) {
    try {
      return await this.model.aggregate(pipeline).exec();
    } catch (error) {
      throw {
        status: 500,
        message: "Error aggregating records",
        error: error.message
      };
    }
  }

  /**
   * Bulk insert many documents
   */
  async insertMany(data) {
    try {
      return await this.model.insertMany(data);
    } catch (error) {
      throw {
        status: error.code === 11000 ? 400 : 500,
        message: error.code === 11000 ? "Duplicate entries" : "Error inserting records",
        error: error.message
      };
    }
  }
}

module.exports = CRUDService;

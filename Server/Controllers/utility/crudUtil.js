// crudUtil.js
const getPaginatedData = async (Model, query, page, perPage) => {
    try {
      const skip = (page - 1) * perPage;
      const count = await Model.countDocuments(query);
      const data = await Model.find(query).limit(perPage).skip(skip);
      const pageCount = Math.ceil(count / perPage);
  
      return {
        Pagination: {
          count,
          pageCount,
        },
        data,
      };
    } catch (error) {
      throw error;
    }
  };
  
  const createData = async (Model, data) => {
    try {
      const newData = new Model(data);
      await newData.save();
      return newData;
    } catch (error) {
      throw error;
    }
  };
  
  const updateData = async (Model, id, data) => {
    try {
      const updatedData = await Model.findByIdAndUpdate(id, data, { new: true });
      await updatedData.save();
      return updatedData;
    } catch (error) {
      throw error;
    }
  };
  
  const deleteData = async (Model, id) => {
    try {
      const deletedData = await Model.findByIdAndDelete(id);
      return deletedData;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    getPaginatedData,
    createData,
    updateData,
    deleteData,
  };
  
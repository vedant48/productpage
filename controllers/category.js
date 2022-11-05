const Category = require('../models/category');

exports.create = async (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  try {

    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).json({
        error: 'Category already exist',
      });
    }

    const newCategory =  new Category({ name });
    await newCategory.save();
    res.json({
      message: 'Category created',
    });
  } catch (error) {
    console.log('createCategory error', error)
    res.status(500).json({
      error: 'Error saving category in database. Try again',
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log('readAllCategories error', error)
    res.status(500).json({
      error: 'Error reading categories from database. Try again',
    });
  }
};
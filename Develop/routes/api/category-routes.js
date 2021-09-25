const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//finds all category data
router.get('/', async (req, res) => {
  try {
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//finds one category by id
router.get('/:id', async (req, res) => {
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product }]
    });

    res.status(200).json(oneCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

//creates category
router.post('/', async (req, res) => {
  const categoryName = req.body.category_name;

  const newCategory = {
    category_name: categoryName,
  };

  try {
    const createCategory = await Category.create(newCategory);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updates category by id
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: categoryId,
      },
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes category by id
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  
  try {
    const deleteCategory = await Category.destroy(req.body, {
      where: {
        id: categoryId,
      },
    });
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

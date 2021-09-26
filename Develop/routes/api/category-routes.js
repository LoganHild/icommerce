const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//finds all category data//works
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

//finds one category by id//works
router.get('/:id', async (req, res) => {
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product }]
    });

    if (!oneCategoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(oneCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

//creates category//works
router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json({ message: 'Successfully created a new category!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//updates category by id//works
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({ message: 'Successfully updated the selected category!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes category by id//works
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({ message: 'Successfully deleted the selected category!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

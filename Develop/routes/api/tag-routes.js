const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags//works
router.get('/', async (req, res) => {
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one tag by id//works
router.get('/:id', async (req, res) => {
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!oneTagData) {
      res.status(404).json({message: 'No Tags found with that id!' });
      return;
    }

    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//creates new Tag//works
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json({ message: 'New tag created!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//updates Tag by id//works
router.put('/:id', async (req, res) => {
  const tagId = req.params.id;

  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: tagId,
      },
    });
    res.status(200).json({ message: 'Tag successfully updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletes tag by id//works
router.delete('/:id', async (req, res) => {
  const tagId = req.params.id;

  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: tagId,
      },
    });
    res.status(200).json({ message: 'Tag successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

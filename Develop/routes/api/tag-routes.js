const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
    if(!tagData) {
      res.status(404).json({ message: 'No tag with that id!'})
    }
    res.status(200)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tag = Tag.create(req.body)
    if (req.body.tagIds.length) {
      const tagTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: tag.id,
          tag_id,
        }
      })
      return ProductTag.bulkCreate(tagTagIdArr)
    }
    res.status(200).json(err)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

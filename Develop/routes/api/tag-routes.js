const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });

    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        }
      ]
    })
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag)
    })
    .catch((err) => {
    console.error(err);
    res.status(400).json(err)
    })
  });

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(200)
  })
  .catch((err) => {
    console.error(err)
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.findByPk(req.params.id)
  .then((tag) => {
    if (!tag) {
      return res.status(404).json({ message: 'tag not found' });
    }
    
    return tag.destroy();
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err)
  });
});

module.exports = router;

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        }
      ]
    })
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category)
  })
  .catch((err) => {
  console.error(err);
  res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({ category_name: req.body.category_name }, {
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
  // delete a category by its `id` value
  Category.findByPk(req.params.id)
  .then((category) => {
    if (!category) {
      return res.status(404).json({ message: 'category not found' });
    }
    
    return category.destroy();
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

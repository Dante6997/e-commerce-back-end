const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'price', 'stock', 'category_id']
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: "Cannot find category."});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: "Cannot find category."});
      return;
    }
    res.json(categoryData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    },
  }
  )
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: "Cannot find category."});
      return;
    }
    res.json(categoryData);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: "Cannot find category."});
      return;
    }
    res.json(categoryData);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;

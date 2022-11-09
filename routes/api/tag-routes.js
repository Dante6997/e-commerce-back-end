const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    include: [
      {
        model: Product,
        attributes: ['id', 'tag_name'],
      },
    ],
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({message: "Cannot find category."});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: "Cannot find id."});
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  }) 
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.body.id,
    },
  }
  )
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: "Cannot find tag by id."});
      return;
    }
    res.status(categoryData);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.body.id,
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
    console.log(err)
    res.status(500).json(err);
  });
});

module.exports = router;

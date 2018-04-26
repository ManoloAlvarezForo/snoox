const express = require('express');
const router = require('express-promise-router')();
const ItemController = require('../controllers/item');

router.route('/')
    .get(ItemController.index)
    .post(ItemController.newItem);

router.route('/:itemId')
.get(ItemController.getItem)
.put(ItemController.replaceItem)
.patch(ItemController.updateItem)

module.exports = router;


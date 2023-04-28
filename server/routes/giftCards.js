const express = require('express');
const router = express.Router();
const giftCardsController = require('../controllers/giftCards');

router.get('/giftCards', giftCardsController.getGiftCards);
router.post('/giftCards', giftCardsController.createGiftCard);
router.get('/giftCards/:id', giftCardsController.getGiftCardById);
router.put('/giftCards/:id', giftCardsController.updateGiftCardById);
router.delete('/giftCards/:id', giftCardsController.deleteGiftCardById);

module.exports = router;
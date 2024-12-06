
router.get('/:productId', async (req, res) => {
    try {
      const messages = await Message.find({ productId: req.params.productId })
        .populate('sender', 'name email')
        .populate('receiver', 'name email')
        .sort({ createdAt: 1 });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
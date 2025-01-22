const express = require('express');
const { markAsRead } = require('../controllers/chatController');
const router = express.Router();
const upload = require('../utils/fileUpload');

router.put('/menssages/:menssagesId/read', markAsRead);
router.post('/message', upload.single('attachment'), sendMessageWithAttachment);


module.exports = router;
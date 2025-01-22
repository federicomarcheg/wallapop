const Message = require('../models/Message');

exports.markAsRead = async ( req, res) => {
    try {
        const { menssageId } = req.params;
        const message = await Message.findByIdAndUpdate(menssageId, { isRead: true }, { new: true });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error al marcar el menssaje como leido'});
    }
}


exports.sendMessageWithAttachment = async (req, res) => {
    try {
        const { senderId, receiverId, text } = req.body;
        const file = req.file ? `/uploads/${req.file.filename}` : null;


        const newMessage = await Message.create({ senderId, receiverId, text, attachment: file });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el mensaje con el adjunto' });

        
    }
};
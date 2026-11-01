import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartner, deleteMessageForEveryone, clearChat, deleteMessageForMe } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";


const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(arcjetProtection, protectRoute)

router.get('/contacts', getAllContacts)
router.get('/chats', getChatPartner)
router.get('/:id', getMessagesByUserId)
router.post('/send/:id', sendMessage)
router.delete('/delete-everyone/:id', deleteMessageForEveryone);
router.delete('/delete-me/:id', deleteMessageForMe);
router.delete('/clear/:id', clearChat);

export default router;

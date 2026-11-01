import cloudinary from "../lib/cloudinary.js";
import { getReciverScoketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(("Error in get all contents ", error));
    res.status(500).json({ message: "server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
        deletedBy: { $ne: myId },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get Messages controller: ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required. " });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself. " });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(400).json({ message: "Reciver not found. " });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketIds = getReciverScoketId(receiverId);
    if (receiverSocketIds && receiverSocketIds.length > 0) {
      io.to(receiverSocketIds).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in get Messages controller: ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getChatPartner = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged in user is either sender or reciver
    const message = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        message.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in get Messages controller: ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteMessageForEveryone = async (req, res) => {
  const {id: messageId} = req.params;
  const myId = req.user._id;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({message: "Message not found"})
    }

    if (message.senderId.toString() !== myId.toString()) {
      return res.status(403).json({message: "You can only delete your own messages for everyone"})
    }

    await Message.findByIdAndDelete(messageId);

    const receiverSocketIds = getReciverScoketId(message.receiverId);
    if (receiverSocketIds && receiverSocketIds.length > 0) {
      io.to(receiverSocketIds).emit("messageDeleted", messageId)
    }

    res.status(200).json({message: "message deleted successfully", messageId})
  } catch (error) {
    console.log("Error in deleteMessageForEveryone controller: ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}
export const deleteMessageForMe = async (req, res) => {
  const { id: messageId } = req.params;
  const myId = req.user._id;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({message: "Message not found"})
    }

    const isParticipant = message.senderId.toString() === myId.toString() || message.receiverId.toString() === myId.toString();

    if(!isParticipant) {
      return res.status(403).json({message: 'you are not part of this conversation'})
    }
    
    const alreadyDeleted = message.deletedBy.some(id => id.toString() === myId.toString());

    if (!alreadyDeleted) {
      message.deletedBy.push(myId);
      await message.save()
    }

    res.status(200).json({ message: "Message deleted for you", messageId });
  } catch (error) {
        console.log("Error in deleteMessageForMe controller: ", error.message);
        res.status(500).json({ message: "internal server error" });
  }
}
  export const clearChat = async (req, res) => { 
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    try {

      await Message.updateMany(
      // Filter: Find all messages between us
      {
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      },
      // Update: Add myId to the deletedBy list
      {
        $addToSet: { deletedBy: myId },
      }
    );
      res.status(200).json({ message: "Chat cleared successfully" });
    } catch (error) {
          console.log("Error in clearChat controller: ", error.message);
          res.status(500).json({ message: "internal server error" });
    }
  }
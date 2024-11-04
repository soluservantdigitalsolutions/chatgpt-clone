const { Chat } = require("../models/chat.model");
const { UserChat } = require("../models/userChat.model");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { userId, text } = req.body;

  try {
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const createdChat = await newChat.save();

    const userChats = await UserChat.find({ userId });
    if (!userChats.length) {
      const newUserChats = new UserChat({
        userId,
        chats: [
          {
            _id: createdChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUserChats.save();
    } else {
      await UserChat.updateOne(
        { userId },
        {
          $push: {
            chats: {
              _id: createdChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).json(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred creating chat!");
  }
});

module.exports = router;

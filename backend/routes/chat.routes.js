const { text } = require("express");
const { Chat } = require("../models/chat.model");
const { UserChat } = require("../models/userChat.model");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");

const router = require("express").Router();

router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;

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

router.get("/user", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChats = await UserChat.find({ userId });
    res.status(200).json(userChats[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred fetching UserChats!");
  }
});

router.get("/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred fetching chat!");
  }
});

router.put("/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { question, answer, image } = req.body;
  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(image && { image }) }]
      : []),
    ,
    {
      role: "model",
      parts: [{ text: answer }],
    },
  ];
  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).json(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred saving conversation!");
  }
});

module.exports = router;

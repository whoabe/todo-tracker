const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Todo = require("../../models/Todo");
const User = require("../../models/User");
const checkObjectId = require("../../middleware/checkObjectId");

// @route    POST api/todos
// @desc     Create a todo
// @access   Private
router.post(
  "/",
  [auth, [check("value", "Value is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //   const user = await User.findById(req.user.id).select("-password");

      const newTodo = new Todo({
        user: req.user.id,
        value: req.body.value,
        completed: false,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/todos
// @desc     Get all todos
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/todo/:id
// @desc     Get todo by ID
// @access   Private
router.get("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    res.json(todo);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
// router.put("/like/:id", [auth, checkObjectId("id")], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: "Post already liked" });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put("/unlike/:id", [auth, checkObjectId("id")], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has not yet been liked
//     if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: "Post has not yet been liked" });
//     }

//     // remove the like
//     post.likes = post.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route    POST api/todos/session/:id
// @desc     Add session on a todo
// @access   Private
router.post(
  "/session/:id",
  [
    auth,
    checkObjectId("id"),
    // [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //   const user = await User.findById(req.user.id).select("-password");
      const todo = await Todo.findById(req.params.id);

      const newSession = {
        user: req.user.id,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      };

      todo.sessions.unshift(newSession);

      await todo.save();

      res.json(todo.sessions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/todos/session/:id/:session_id
// @desc     Delete session
// @access   Private
router.delete("/session/:id/:session_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Pull out session
    const session = todo.sessions.find(
      (session) => session.id === req.params.session_id
    );
    // Make sure session exists
    if (!session) {
      return res.status(404).json({ msg: "Session does not exist" });
    }
    // Check user
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.sessions = todo.sessions.filter(
      ({ id }) => id !== req.params.session_id
    );

    await todo.save();

    return res.json(todo.sessions);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// need an api call to modify a session using the id

module.exports = router;

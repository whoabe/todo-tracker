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
        totalTime: 0,
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

// @route    PUT api/todos/session/:id/
// @desc     Edit todo name
// @access   Private
router.put("/:id", auth, async (req, res) => {
  try {
    // pull out todo
    const todo = await Todo.findById(req.params.id);
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // update the name
    todo.value = req.body.value;
    await todo.save();
    return res.json(todo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/session/toggle/:id/
// @desc     Toggle Todo completed
// @access   Private
router.put("/toggle/:id", auth, async (req, res) => {
  try {
    // pull out todo
    const todo = await Todo.findById(req.params.id);
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // update the name
    todo.completed = !todo.completed;
    await todo.save();
    return res.json(todo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    // Check user
    // if (todo.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "User not authorized" });
    // }

    // const todo = await Todo.findById(req.params.id);
    // const todos = await Todo.find().sort({ date: -1 });

    // await todo.remove();
    // console.log(todos);
    await Todo.findOneAndRemove({ _id: req.params.id });

    const todos = await Todo.find().sort({ date: -1 });
    return res.json(todos);
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
        // user: req.user.id,
        todo: req.params.id,
        // description: req.body.description,
        startTime: req.body.startTime,
        time: 0,
      };

      todo.sessions.unshift(newSession);

      await todo.save();
      //
      const currentSession = todo.sessions[0];
      res.json(currentSession);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/todos/session/:id/:session_id
// @desc     Complete session
// @access   Private
router.put("/session/:id/:session_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Pull out session
    const session = todo.sessions.find(
      (session) => session.id === req.params.session_id
    );
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // Make sure session exists
    if (!session) {
      return res.status(404).json({ msg: "Session does not exist" });
    }

    // add endTime to Todo
    session.endTime = req.body.endTime;
    session.time = session.endTime - session.startTime;
    todo.totalTime = todo.sessions.reduce((sessionTime, session) => {
      return sessionTime + session.time;
    }, 0);
    await todo.save();

    // if you want to return the saved/completed session:
    // const completedSession = todo.sessions.find(
    //   (session) => session.id === req.params.session_id
    // );
    // return res.json(completedSession);
    return res.json(todo);
    // returning the entire todo because we need to have the totalTime updated in the redux state
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

///////////////
// @route    PUT api/todos/session/edit/:id/:session_id
// @desc     Edit session
// @access   Private
router.put("/session/edit/:id/:session_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Pull out session
    const session = todo.sessions.find(
      (session) => session.id === req.params.session_id
    );
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // Make sure session exists
    if (!session) {
      return res.status(404).json({ msg: "Session does not exist" });
    }

    // check for start/endTime and add them in
    // throw in a check that makes sure the endtime is greater than the startTime
    if (
      req.body.startTime &&
      Date.parse(req.body.startTime) > Date.parse(session.endTime)
    ) {
      return res
        .status(403)
        .json({ msg: "startTime cannot be greater than the endTime" });
    } else if (req.body.startTime) {
      session.startTime = req.body.startTime;
    }
    if (
      req.body.endTime &&
      Date.parse(req.body.endTime) < Date.parse(session.startTime)
    ) {
      return res
        .status(403)
        .json({ msg: "endTime cannot be less than the startTime" });
    } else if (req.body.endTime) {
      session.endTime = req.body.endTime;
    }

    session.time = session.endTime - session.startTime;
    todo.totalTime = todo.sessions.reduce((sessionTime, session) => {
      return sessionTime + session.time;
    }, 0);
    await todo.save();

    // if you want to return the saved/completed session:
    // const completedSession = todo.sessions.find(
    //   (session) => session.id === req.params.session_id
    // );
    // return res.json(completedSession);
    return res.json(todo);
    // returning the entire todo because we need to have the totalTime updated in the redux state
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
//////////////

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
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.sessions = todo.sessions.filter(
      ({ id }) => id !== req.params.session_id
    );
    if (session.endTime) {
      todo.totalTime = todo.sessions.reduce((sessionTime, session) => {
        return sessionTime + session.time;
      }, 0);
    }
    // need to check if there is an endTime, if yes, then subtract
    await todo.save();

    return res.json(todo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//////////////////////////////////////////////////////////
/////////////////////////////////
// @route    POST api/todos/break/:id
// @desc     Add break on a todo
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

      const newBreak = {
        // user: req.user.id,
        todo: req.params.id,
        // description: req.body.description,
        startTime: req.body.startTime,
        time: 0,
      };

      todo.breaks.unshift(newBreak);

      await todo.save();
      res.json(todo);
      //
      // const currentSession = todo.sessions[0];
      // res.json(currentSession);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/todos/break/:id/:break_id
// @desc     Complete session
// @access   Private
router.put("/break/:id/:break_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Pull out session
    const breakk = todo.breaks.find(
      (breakk) => breakk.id === req.params.break_id
    );
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // Make sure session exists
    if (!breakk) {
      return res.status(404).json({ msg: "Session does not exist" });
    }

    // add endTime to Todo
    breakk.endTime = req.body.endTime;
    breakk.time = breakk.endTime - breakk.startTime;
    todo.totalBreakTime = todo.breaks.reduce((breakTime, breakk) => {
      return breakTime + breakk.time;
    }, 0);
    await todo.save();

    // if you want to return the saved/completed session:
    // const completedSession = todo.sessions.find(
    //   (session) => session.id === req.params.session_id
    // );
    // return res.json(completedSession);
    return res.json(todo);
    // returning the entire todo because we need to have the totalTime updated in the redux state
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

///////////////
// @route    PUT api/todos/break/edit/:id/:break_id
// @desc     Edit break
// @access   Private
router.put("/break/edit/:id/:session_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Pull out session
    const breakk = todo.breaks.find(
      (breakk) => breakk.id === req.params.break_id
    );
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // Make sure session exists
    if (!breakk) {
      return res.status(404).json({ msg: "Session does not exist" });
    }

    // check for start/endTime and add them in
    // throw in a check that makes sure the endtime is greater than the startTime
    if (
      req.body.startTime &&
      Date.parse(req.body.startTime) > Date.parse(breakk.endTime)
    ) {
      return res
        .status(403)
        .json({ msg: "startTime cannot be greater than the endTime" });
    } else if (req.body.startTime) {
      breakk.startTime = req.body.startTime;
    }
    if (
      req.body.endTime &&
      Date.parse(req.body.endTime) < Date.parse(breakk.startTime)
    ) {
      return res
        .status(403)
        .json({ msg: "endTime cannot be less than the startTime" });
    } else if (req.body.endTime) {
      breakk.endTime = req.body.endTime;
    }

    breakk.time = breakk.endTime - breakk.startTime;
    todo.totalBreakTime = todo.breaks.reduce((breakTime, breakk) => {
      return breakTime + breakk.time;
    }, 0);
    await todo.save();

    // if you want to return the saved/completed session:
    // const completedSession = todo.sessions.find(
    //   (session) => session.id === req.params.session_id
    // );
    // return res.json(completedSession);
    return res.json(todo);
    // returning the entire todo because we need to have the totalTime updated in the redux state
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
//////////////

// @route    DELETE api/todos/break/:id/:break_id
// @desc     Delete break
// @access   Private
router.delete("/break/:id/:break_id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Pull out session
    const breakk = todo.breaks.find(
      (breakk) => breakk.id === req.params.session_id
    );
    // Make sure session exists
    if (!breakk) {
      return res.status(404).json({ msg: "Session does not exist" });
    }
    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    todo.breaks = todo.breaks.filter(({ id }) => id !== req.params.session_id);
    if (breakk.endTime) {
      todo.totalBreakTime = todo.breaks.reduce((breakTime, breakk) => {
        return breakTime + breakk.time;
      }, 0);
    }
    // need to check if there is an endTime, if yes, then subtract
    await todo.save();

    return res.json(todo);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

// const validateUser = require("../middleware/auth");
const postController = require("../controllers/post");
const roleMiddleware = require("../middleware/roleMiddeware") // we can use hear bcz only CONTENT_CREATER person can use that for authorization criteria

router.get("/api/v1/post" ,roleMiddleware("ADMIN"), postController.listPosts);

router.post("/api/v1/post" ,roleMiddleware("CONTENT_CREATOR"), postController.createPost);

module.exports = router;
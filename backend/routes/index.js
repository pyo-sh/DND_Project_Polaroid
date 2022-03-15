const express = require("express");
const router = express.Router();

const Users = require("./Users");
const MyPage = require("./MyPage");
const Ranking = require("./Ranking");
const Film = require("./Film");
const Favorite = require("./Favorite");
const Follow = require("./Follow");
const LikeRanking = require("./LikeRanking");
const Upload = require("./Upload");
const Images = require("./Images");
const ImgLike = require("./ImgLike");

router.use("/user", Users);
router.use("/mypage", MyPage);
router.use("/ranking", Ranking);
router.use("/film", Film);
router.use("/favorite", Favorite);
router.use("/follow", Follow);
router.use("/likeranking", LikeRanking);
router.use("/upload", Upload);
router.use("/images", Images);
router.use("/imglike", ImgLike);

router.use(function (err, req, res, next) {
	const { status, message } = err;
	if (status < 400) next();
	res.status(status).send({ error: message });
});

module.exports = router;

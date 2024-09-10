const express = require("express");
const router = express.Router();

const {
  createSocialMedia,
  getAllSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require("../../controllers/v1/social");
const { adminAuth } = require("../../middlewares/adminCheck");

const { multerStorage } = require("../../utils/multerConfig");
const upload = multerStorage("public/images/socials");

router
  .route("/")
  .post(adminAuth, upload.single("icon"), createSocialMedia)
  .get(getAllSocialMedia);
router
  .route("/:socialId")
  .put(adminAuth, upload.single("icon"), updateSocialMedia);
  
router.route("/:socialId/xbox").delete(adminAuth, deleteSocialMedia);

module.exports = router;

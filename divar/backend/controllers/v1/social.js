const {
  createSocialValidator,
  updateSocialValidator,
} = require("../../validators/v1/social");
const SocialMedia = require("../../models/Social");
const { successResponse, errorResponse } = require("../../helpers/responses");
const fs = require("fs");
const path = require("path");

const supportedFormats = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/octet-stream",
];
exports.createSocialMedia = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    await createSocialValidator.validate({ name, link }, { abortEarly: false });

    if (!req.file) {
      return errorResponse(
        res,
        400,
        `Category Icon is required - field:"icon"`
      );
    }
    const { filename, mimetype } = req.file;
    if (!supportedFormats.includes(mimetype)) {
      return errorResponse(res, 400, "Unsupported image format");
    }

    const icon = {
      filename: filename,
      path: `images/socials/${filename}`,
    };

    const newSocial = await SocialMedia.create({ icon, name, link });

    return successResponse(res, 201, {
      social: newSocial,
      message: "social media added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSocialMedia = async (req, res, next) => {
  try {
    const { socialId } = req.params;
    const { name, link } = req.body;

    await updateSocialValidator.validate({ name, link }, { abortEarly: false });

    let icon = undefined;
    if (req.file) {
      const { filename, mimetype } = req.file;

      if (!supportedFormats.includes(mimetype)) {
        return errorResponse(res, 400, "Unsupported image format");
      }

      const oldData = await SocialMedia.findOne({ _id: socialId });
      if (oldData.icon?.filename) {
        const imgPath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          "socials",
          oldData.icon.filename
        );
        try {
          fs.unlinkSync(imgPath);
        } catch (err) {
          console.log(err);
        }
      }
      icon = {
        filename: filename,
        path: `images/socials/${filename}`,
      };
    }

    const socialMedia = await SocialMedia.findByIdAndUpdate(
      socialId,
      { icon, name, link },
      {
        new: true,
      }
    );
    if (!socialMedia) return errorResponse(res, 400, "Social media not found");

    return successResponse(res, 200, {
      social: socialMedia,
      message: "social media edited successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSocialMedia = async (req, res) => {
  try {
    const { socialId } = req.params;

    const socialMedia = await SocialMedia.findByIdAndDelete(socialId);
    if (!socialMedia) return errorResponse(res, 400, "Social media not found");

    return successResponse(res, 200, {
      social: socialMedia,
      message: "social media deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllSocialMedia = async (req, res) => {
  try {
    const socials = await SocialMedia.find();
    return successResponse(res, 200, {
      socials,
    });
  } catch (error) {
    next(error);
  }
};

const { errorResponse, successResponse } = require("../../helpers/responses");
const Note = require("../../models/Note");
const {
  getCityData,
  createPaginationData,
  getNeighborhoodData,
} = require("./post");

// Add a note
exports.addNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId, content } = req.body;

    const existingNote = await Note.findOne({ user: user._id, post: postId });
    if (existingNote) {
      return errorResponse(
        res,
        400,
        "Another Note already exists for this post"
      );
    }

    const newNote = await Note.create({
      user: user._id,
      post: postId,
      content,
    });

    return successResponse(res, 201, {
      note: newNote,
      message: "Note added successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Edit a note
exports.editNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;
    const { content } = req.body;

    const existingNote = await Note.findById(noteId);

    if (!existingNote || existingNote.user.toString() !== user._id.toString()) {
      return errorResponse(res, 404, "Note not found or unauthorized access");
    }

    const note = await Note.findByIdAndUpdate(
      noteId,
      { content },
      { new: true }
    );

    return successResponse(res, 200, {
      note,
      message: "Note edited successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Remove a note
exports.removeNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;
    const existingNote = await Note.findById(noteId);

    if (!existingNote || existingNote.user.toString() !== user._id.toString()) {
      return errorResponse(res, 404, "Note not found or unauthorized access");
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    return successResponse(res, 200, {
      note: deletedNote,
      message: "Note removed successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get a single note
exports.getNote = async (req, res, next) => {
  try {
    const user = req.user;
    const { noteId } = req.params;

    const note = await Note.findById(noteId)
      .populate("user")
      .populate("post")
      .lean();

    if (!note || note.user._id.toString() !== user._id.toString()) {
      return errorResponse(res, 404, "Note not found or unauthorized access");
    }
    if (!note.post) {
      await Note.findOneAndDelete({ _id: note._id });
      return errorResponse(res, 404, "This post has been removed");
    }

    const post = {
      ...note.post,
      city: getCityData(note.post.city),
      neighborhood: getNeighborhoodData(note.post.neighborhood),
      note: {
        _id: note._id,
        content: note.content,
        createdAt: note.createdAt,
      },
    };

    return successResponse(res, 200, {
      post,
    });
  } catch (err) {
    next(err);
  }
};

// Get all notes of a user
exports.getAllNotes = async (req, res, next) => {
  try {
    const user = req.user;
    const { page = 1, limit = 10 } = req.query;

    const notes = await Note.find({ user: user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "post",
        populate: "category creator",
      })
      .lean();

    notedPosts = [];
    for (const note of notes) {
      if (note.post) {
        const post = {
          ...note.post,
          city: getCityData(note.post.city),
          neighborhood: getNeighborhoodData(note.post.neighborhood),
          note: {
            _id: note._id,
            content: note.content,
            createdAt: note.createdAt,
          },
        };
        notedPosts.push(post);
      } else {
        await Note.findOneAndDelete({ _id: note._id });
      }
    }

    const totalPosts = await Note.countDocuments({ user: user._id });
    return successResponse(res, 200, {
      posts: notedPosts,
      pagination: createPaginationData(page, limit, totalPosts),
    });
  } catch (err) {
    next(err);
  }
};

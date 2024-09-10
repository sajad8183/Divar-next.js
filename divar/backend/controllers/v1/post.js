const path = require("path");
const fs = require("fs");

const Post = require("../../models/Post");
const SubCategory = require("../../models/SubCategory");
const cities = require("../../cities/cities.json");
const neighborhoods = require("../../cities/neighborhoods.json");

const {
  dynamicFieldsValidator,
  postStaticFieldsValidator,
  postStaticFieldsUpdateValidator,
} = require("../../validators/v1/post");

const { successResponse, errorResponse } = require("../../helpers/responses");
const Bookmark = require("../../models/Bookmark");
const Note = require("../../models/Note");
const Category = require("../../models/Category");
const View = require("../../models/View");

const supportedFormats = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/octet-stream",
];

const createPost = async (req, res, next) => {
  try {
    const user = req.user;
    const { categoryId } = req.params;
    const category = await SubCategory.findById(categoryId);
    if (!category) {
      return errorResponse(res, 404, "Category not found");
    }

    // validations:
    const fields = category.productFields;
    const dynamicFields = [];

    const categoryFields = req.body.categoryFields;
    let dynamics = {};
    if (categoryFields) {
      dynamics = await JSON.parse(req.body.categoryFields);
    }
    for (const field of fields) {
      const fieldObj = field.toObject();
      await dynamicFieldsValidator(fieldObj, dynamics[fieldObj.slug]);
      const { options, ...selectedFields } = fieldObj;
      const dynamicField = { ...selectedFields, data: dynamics[fieldObj.slug] };
      dynamicFields.push(dynamicField);
    }

    const { city, neighborhood, title, description, price, exchange } =
      req.body;

    const mapData = req.body.map;
    const map = mapData ? JSON.parse(mapData) : undefined;
    await postStaticFieldsValidator.validate(
      { city, neighborhood, title, description, price, map, exchange },
      { abortEarly: false }
    );

    //image upload
    const pics = [];
    if (req.files && Object.keys(req.files).length !== 0) {
      for (const file of req.files) {
        const { filename, path, mimetype } = file;

        if (!supportedFormats.includes(mimetype)) {
          return errorResponse(res, 400, "Unsupported image format");
        }

        const image = {
          filename: filename,
          path: `images/posts/${filename}`,
        };

        pics.push(image);
      }
    }

    const newPost = await Post.create({
      creator: user._id,
      category: categoryId,
      city,
      neighborhood,
      pics,
      price,
      exchange,
      title,
      description,
      map,
      dynamicFields,
    });

    const post = await Post.findById(newPost._id)
      .populate("creator", "phone")
      .populate("category")
      .lean();

    const cityData = cities.find(
      (city) => city.id.toString() == post.city.toString()
    );
    const neighborhoodData = neighborhoods.find(
      (ng) => ng.id.toString() == post.neighborhood.toString()
    );
    post.city = cityData || {
      id: 0,
      name: "not found",
      slug: "not_found",
      province_id: 0,
    };
    post.neighborhood = neighborhoodData || {
      id: 0,
      name: "not found",
      city_id: 0,
    };

    return successResponse(res, 201, {
      post,
      messae: "post created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    // Check permission to edit
    const post = await Post.findById(postId);
    if (user.role !== "ADMIN") {
      if (!post || post.creator.toString() !== user._id.toString()) {
        return errorResponse(res, 401, "Unauthorized to edit post");
      }
    }

    // Extract and validate dynamic fields based on category
    const category = await SubCategory.findById(post.category);
    if (!category) {
      return errorResponse(res, 404, "there is something wrong with category");
    }

    const fields = category.productFields;
    const dynamicFields = [];

    const categoryFields = req.body.categoryFields;
    let dynamics = {};
    if (categoryFields) {
      dynamics = await JSON.parse(req.body.categoryFields);
    }

    const oldPost = await Post.findOne({ _id: postId });

    for (const field of fields) {
      const fieldObj = field.toObject();
      let data = dynamics[fieldObj.slug];
      if (data === undefined) {
        const oldData = oldPost.dynamicFields.find(
          (field) => field.slug === fieldObj.slug
        );
        data = oldData.data;
      }
      await dynamicFieldsValidator(fieldObj, data);
      const { options, ...selectedFields } = fieldObj;
      const dynamicField = { ...selectedFields, data };
      dynamicFields.push(dynamicField);
    }

    const { city, neighborhood, title, description, price, exchange } =
      req.body;

    const mapData = req.body.map;
    const map = mapData ? JSON.parse(mapData) : undefined;

    await postStaticFieldsUpdateValidator.validate(
      { city, neighborhood, title, description, price, map, exchange },
      { abortEarly: false }
    );

    let pics;
    if (req.files && Object.keys(req.files).length !== 0) {
      pics = [];
      for (const file of req.files) {
        const { filename, path, mimetype } = file;

        if (!supportedFormats.includes(mimetype)) {
          return errorResponse(res, 400, "Unsupported image format");
        }

        const oldpics = post.pics;
        for (const p of oldpics) {
          if (p.filename === filename) {
            p.repeated = true;
            continue;
          }
        }

        const image = {
          filename: filename,
          path: `images/posts/${filename}`,
        };

        pics.push(image);
      }

      //* to remove the deleted image
      // const oldpics = post.pics;
      // for (const p of oldpics) {
      //   if (!p.repeated) {
      //     const imgPath = path.join(
      //       __dirname,
      //       "..",
      //       "..",
      //       "public",
      //       "images",
      //       "posts",
      //       p.filename
      //     );
      // fs.unlinkSync(imgPath, (err) => {
      //   if (err) {
      //     next(err);
      //   }
      // });
      //   }
      // }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        creator: user._id,
        city,
        neighborhood,
        pics,
        price,
        exchange,
        title,
        description,
        map,
        dynamicFields,
      },
      { new: true }
    )
      .populate("creator", "phone")
      .populate("category")
      .lean();

    const cityData = cities.find(
      (city) => city.id.toString() == updatedPost.city.toString()
    );
    const neighborhoodData = neighborhoods.find(
      (ng) => ng.id.toString() == updatedPost.neighborhood.toString()
    );
    updatedPost.city = cityData || {
      id: 0,
      name: "not found",
      slug: "not_found",
      province_id: 0,
    };
    updatedPost.neighborhood = neighborhoodData || {
      id: 0,
      name: "not found",
      not_found: 0,
    };

    if (!updatedPost) {
      return errorResponse(res, 404, "Post not found");
    }

    return successResponse(res, 200, {
      post: updatedPost,
      message: "Post edited successfully",
    });
  } catch (err) {
    next(err);
  }
};

const postStatusCheck = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { status } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    if (!["pending", "published", "rejected"].includes(status)) {
      return errorResponse(
        res,
        403,
        'status can only be one of these:"pending", "published", "rejected" '
      );
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        status,
      },
      { new: true }
    ).lean();

    const cityData = cities.find(
      (city) => city.id.toString() == updatedPost.city.toString()
    );
    const neighborhoodData = neighborhoods.find(
      (ng) => ng.id.toString() == updatedPost.neighborhood.toString()
    );
    updatedPost.city = cityData || {
      id: 0,
      name: "not found",
      slug: "not_found",
      province_id: 0,
    };
    updatedPost.neighborhood = neighborhoodData || {
      id: 0,
      name: "not found",
      not_found: 0,
    };

    if (!updatedPost) {
      return errorResponse(res, 404, "Post not found");
    }

    return successResponse(res, 200, {
      post: updatedPost,
      message: "Post status updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const addView = async (ipAddress, postId) => {
  // **Check for existing view from this IP in the last 24 hours (consideration):**
  const existingView = await View.findOne({
    post: postId,
    ipAddress,
    createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
  });

  if (existingView) return;

  await View.create({
    post: postId,
    ipAddress,
  });
};

const getPost = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    let ips = (
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      ""
    ).split(",");

    const ipAddress = ips[0].trim();

    const post = await Post.findById(postId)
      .populate("creator", "phone")
      .populate("category")
      .lean();

    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }

    await addView(ipAddress, postId);

    const views = await View.countDocuments({ post: postId });

    const cityData = cities.find(
      (city) => city.id.toString() == post.city.toString()
    );
    const neighborhoodData = neighborhoods.find(
      (ng) => ng.id.toString() == post.neighborhood.toString()
    );
    post.city = cityData || {
      id: 0,
      name: "not found",
      slug: "not_found",
      province_id: 0,
    };
    post.neighborhood = neighborhoodData || {
      id: 0,
      name: "not found",
      not_found: 0,
    };

    if (user) {
      const bookmark = await Bookmark.findOne({
        user: user._id,
        post: post._id,
      });
      post.bookmarked = bookmark ? true : false;
      const note = await Note.findOne({ user: user._id, post: post._id });
      post.note = note ? note : false;
    }
    const breadcrumbs = {};

    const endCategory = post.category;

    const parentOfEndCategory = await Category.findOne({
      _id: endCategory.parent,
    });
    if (parentOfEndCategory.parent) {
      const topCategory = await Category.findOne({
        _id: parentOfEndCategory.parent,
      });
      breadcrumbs.category = { title: topCategory.title, _id: topCategory._id };
      breadcrumbs.subCategory = {
        title: parentOfEndCategory.title,
        _id: parentOfEndCategory._id,
      };
      breadcrumbs.subSubCategory = {
        title: endCategory.title,
        _id: endCategory._id,
      };
    } else {
      breadcrumbs.category = {
        title: parentOfEndCategory.title,
        _id: parentOfEndCategory._id,
      };
      breadcrumbs.subCategory = null;
      breadcrumbs.subSubCategory = {
        title: endCategory.title,
        _id: endCategory._id,
      };
    }

    post.breadcrumbs = breadcrumbs;
    post.views = views;

    return successResponse(res, 200, {
      post,
    });
  } catch (err) {
    next(err);
  }
};

const getAllPublishedPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      categoryId,
      city,
      price,
      neighborhood,
      search,
      exchange,
      ...dynamicFilters
    } = req.query;

    const status = "published";
    const query = await buildQuery(
      categoryId,
      price,
      city,
      neighborhood,
      search,
      exchange,
      status,
      dynamicFilters
    );

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["creator", "category"])
      .lean();

    const totalPosts = await Post.countDocuments(query);

    const postsWithLocations = posts.map((post) => ({
      ...post,
      city: getCityData(post.city),
      neighborhood: getNeighborhoodData(post.neighborhood),
    }));

    return successResponse(res, 200, {
      posts: postsWithLocations,
      pagination: createPaginationData(page, limit, totalPosts),
    });
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      categoryId,
      city,
      price,
      neighborhood,
      search,
      exchange,
      status,
      ...dynamicFilters
    } = req.query;

    const query = await buildQuery(
      categoryId,
      price,
      city,
      neighborhood,
      search,
      exchange,
      status,
      dynamicFilters
    );

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(["creator", "category"])
      .lean();

    const totalPosts = await Post.countDocuments(query);

    const postsWithLocations = posts.map((post) => ({
      ...post,
      city: getCityData(post.city),
      neighborhood: getNeighborhoodData(post.neighborhood),
    }));

    return successResponse(res, 200, {
      posts: postsWithLocations,
      pagination: createPaginationData(page, limit, totalPosts),
    });
  } catch (err) {
    next(err);
  }
};

const buildQuery = async (
  categoryId,
  price,
  city,
  neighborhood,
  search,
  exchange,
  status,
  dynamicFilters
) => {
  const query = {};

  if (categoryId) {
    const categories = await SubCategory.find()
      .populate({
        path: "parent",
        strict: false,
        populate: {
          path: "parent",
          strict: false,
        },
      })
      .lean();

    const childCategories = [];
    for (const category of categories) {
      if (
        category.parent?._id.toString() === categoryId ||
        category.parent.parent?._id.toString() === categoryId ||
        category._id.toString() === categoryId
      ) {
        childCategories.push(category._id);
      }
    }
    query.category = { $in: childCategories };
  }

  if (price) {
    const priceRange = price.split("-");
    minPrice = parseInt(priceRange[0]) || 1;
    maxPrice = parseInt(priceRange[1]);
    query.price = {
      $gte: minPrice,
      $lte: maxPrice ? maxPrice : 9007199254740991,
    };
  }
  if (city) {
    const cityValues = city.split("|").map((v) => parseInt(v));
    query.city = { $in: cityValues };
  }
  if (neighborhood) {
    query.neighborhood = neighborhood;
  }
  if (search) {
    query.$text = { $search: search }; // Utilize full-text search
  }
  if (exchange) {
    query.exchange = exchange;
  }

  // Process dynamic filters with OR logic
  const orFilters = [];
  for (const [key, value] of Object.entries(dynamicFilters)) {
    if (value.includes("|")) {
      const orValues = value.split("|");
      orFilters.push({ [`dynamicFields.${key}`]: { $in: orValues } });
      orFilters.push({ [`dynamicFields.${key}`]: { $in: orValues } });
    } else {
      query[`dynamicFields.${key}`] = value;
    }
  }

  if (orFilters.length > 0) {
    query.$and = orFilters;
  }

  console.log({ status });
  if (status) {
    query.status = status;
  }
  return query;
};

const getCityData = (cityId) => {
  // Replace with optimized city lookup logic (e.g., a map for faster access)
  return (
    cities.find((city) => city.id.toString() === cityId.toString()) || {
      id: 0,
      name: "not found",
      slug: "not_found",
      province_id: 0,
    }
  );
};

const getNeighborhoodData = (neighborhoodId) => {
  // Replace with optimized neighborhood lookup logic
  return (
    neighborhoods.find(
      (ng) => ng.id.toString() === neighborhoodId.toString()
    ) || {
      id: 0,
      name: "not found",
      not_found: 0,
    }
  );
};

const createPaginationData = (page, limit, totalPosts) => {
  return {
    page,
    limit,
    totalPages: Math.ceil(totalPosts / limit),
    totalPosts,
  };
};

// const getAllPosts2 = async (req, res, next) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       categoryId,
//       city,
//       price,
//       neighborhood,
//       search,
//       exchange,
//       ...filters
//     } = req.query;

//     // Static query filters:
//     const staticQueries = {};
//     if (categoryId) {
//       staticQueries.category = categoryId;
//     }
//     if (price) {
//       const priceRange = price.split("-");
//       minPrice = parseInt(priceRange[0]) || 1;
//       maxPrice = parseInt(priceRange[1]);
//       staticQueries.price = {
//         $gte: minPrice,
//         $lte: maxPrice ? maxPrice : 9007199254740991,
//       };
//     }
//     if (city) {
//       const cityValues = city.split("|").map((v) => parseInt(v));
//       staticQueries.city = { $in: cityValues };
//     }
//     if (neighborhood) {
//       staticQueries.neighborhood = neighborhood;
//     }
//     if (search) {
//       staticQueries.$text = { $search: search }; // Utilize full-text search
//     }
//     if (exchange) {
//       staticQueries.exchange = exchange; // Utilize full-text search
//     }

//     const dynamicQueries = {};

//     // Process "or" filters (if present):
//     const orFilters = [];
//     for (const key of Object.keys(filters)) {
//       const value = filters[key];
//       if (value.includes("|")) {
//         // Check for pipe delimiter
//         const orValues = value.split("|");
//         orFilters.push({ [`dynamicFields.${key}`]: { $in: orValues } });
//       } else {
//         dynamicQueries[`dynamicFields.${key}`] = value; // Handle single values
//       }
//     }

//     // Construct the main query:
//     let query = { ...dynamicQueries };
//     if (orFilters.length > 0) {
//       // Use $or operator if there are "or" filters:
//       query.$and = orFilters;
//     }
//     query = { ...query, ...staticQueries };


//     const posts = await Post.find(query)
//       .sort({ createdAt: -1 }) // Sort by creation date descending
//       .skip((page - 1) * limit) // Apply pagination
//       .limit(limit)
//       .populate("creator")
//       .populate("category")
//       .lean();

//     const totalPosts = await Post.countDocuments(query);

//     for (const post of posts) {
//       const cityData = cities.find(
//         (city) => city.id.toString() == post.city.toString()
//       );
//       const neighborhoodData = neighborhoods.find(
//         (ng) => ng.id.toString() == post.neighborhood.toString()
//       );
//       post.city = cityData || {
//         id: 0,
//         name: "not found",
//         slug: "not_found",
//         province_id: 0,
//       };
//       post.neighborhood = neighborhoodData || {
//         id: 0,
//         name: "not found",
//         not_found: 0,
//       };
//     }

//     return successResponse(res, 200, {
//       posts,
//       pagination: {
//         page,
//         limit,
//         totalPages: Math.ceil(totalPosts / limit),
//         totalPosts,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const user = req.user;

    const post = await Post.findById(postId);

    // Check permission to delete
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }
    // Check permission to delete
    if (user.role !== "ADMIN") {
      if (post.creator.toString() !== user._id.toString()) {
        return errorResponse(res, 401, "Unauthorized to delete post");
      }
    }

    // // Optionally delete associated images
    // if (post.pics && post.pics.length > 0) {
    //   for (const image of post.pics) {
    //     const filePath = path.join(
    //       __dirname,
    //       "..",
    //       "..",
    //       "public",
    //       "images",
    //       "posts",
    //       image.filename
    //     ); // Adjust path based on your image storage location
    //     fs.unlinkSync(filePath, (err) => {
    //       if (err) {
    //         console.error("Error deleting image:", err);
    //       }
    //     });
    //   }
    // }

    const deletedPost = await Post.findByIdAndDelete(postId);

    await Bookmark.deleteMany({ post: postId });
    await Note.deleteMany({ post: postId });

    return successResponse(res, 200, {
      post: deletedPost,
      message: "Post deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCityData,
  getNeighborhoodData,
  createPaginationData,
  createPost,
  editPost,
  postStatusCheck,
  getPost,
  getAllPublishedPosts,
  getAllPosts,
  deletePost,
};

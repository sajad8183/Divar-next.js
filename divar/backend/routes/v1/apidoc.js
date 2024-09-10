const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger/swagger.json"); // Replace with the path to your Swagger JSON file
const express = require("express");
const router = express.Router();
// Swagger options
const swaggerOptions = {
  customCss:
    ".swagger-ui .topbar,.operation-servers,.responses-inner .model-example ,.response-col_links { display: none };",
};

// Serve Swagger UI at a specific endpoint
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument, swaggerOptions));

module.exports = router;

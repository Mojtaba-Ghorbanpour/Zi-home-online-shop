const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  editSubcategoryValidationSchema,
  addSubcategoryValidationSchema,
} = require("../validations/subcategory-validation");
const {
  getAllSubcategories,
  addSubcategory,
  getSubcategoryById,
  removeSubcategoryById,
  editSubcategoryById,
} = require("../controllers/subcategory-controller");
const { protect, restrictTo } = require("../controllers/auth-controller");

router.get("/", asyncHandler(getAllSubcategories));

router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  validator(addSubcategoryValidationSchema),
  asyncHandler(addSubcategory)
);

router.get("/:id", asyncHandler(getSubcategoryById));

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  validator(editSubcategoryValidationSchema),
  asyncHandler(editSubcategoryById)
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  asyncHandler(removeSubcategoryById)
);

module.exports = router;

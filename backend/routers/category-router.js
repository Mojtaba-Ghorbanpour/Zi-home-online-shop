const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  addCategoryValidationSchema,
  editCategoryValidationSchema,
} = require("../validations/category-validation");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  editCategoryById,
  removeCategoryById,
  uploadCategoryIcon,
} = require("../controllers/category-controller");
const { protect, restrictTo } = require("../controllers/auth-controller");

router.get("/", asyncHandler(getAllCategories));

router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadCategoryIcon,
  validator(addCategoryValidationSchema),
  asyncHandler(addCategory)
);

router.get("/:id", asyncHandler(getCategoryById));

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadCategoryIcon,
  validator(editCategoryValidationSchema),
  asyncHandler(editCategoryById)
);

router.delete("/:id", asyncHandler(removeCategoryById));

module.exports = router;

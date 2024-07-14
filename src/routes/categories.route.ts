import { Router } from "express";
import { CategoriesController } from "../controllers/categories.controller";
import { CreateCategorySchema } from "../dtos/catories.dto";
import { ParamsType, validator } from "../middleware/validor.middleware";

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post(
	"/",
	validator({
		schema: CreateCategorySchema,
		type: ParamsType.BODY,
	}),
	controller.create,
);

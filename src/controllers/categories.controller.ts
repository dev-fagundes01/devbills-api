import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { CreateCategoryDTO } from "../dtos/catories.dto";
import type { CategoriesService } from "../services/categories.service";
import type { BodyRequest } from "./types";

export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}
	create = async (
		req: BodyRequest<CreateCategoryDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { title, color } = req.body;

			const result = await this.categoriesService.create({ title, color });

			return res.status(StatusCodes.CREATED).json(result);
		} catch (error) {
			next(error);
		}
	}

	index = async (_: Request, res: Response, next: NextFunction) => {
		try {
			const result = await this.categoriesService.index();

			return res.status(StatusCodes.OK).json(result);
		} catch (error) {
			next(error);
		}
	}
}

import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import type { CreateCategoryDTO } from "../dtos/catories.dto";
import { CategoriesService } from "../services/categories.service";

export class CategoriesController {
	async create(
		req: Request<unknown, unknown, CreateCategoryDTO>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { title, color } = req.body;

			const repository = new CategoriesRepository(CategoryModel);
			const service = new CategoriesService(repository);

			const result = await service.create({ title, color });

			return res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	async index(req: Request, res: Response, next: NextFunction) {
		try {
			const repository = new CategoriesRepository(CategoryModel);
			const service = new CategoriesService(repository);

			const result = await service.index();

			return res.status(StatusCodes.OK).json(result);
		} catch (error) {
			next(error);
		}
	}
}

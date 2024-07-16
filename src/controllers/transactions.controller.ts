import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { TransactionsService } from "../services/transactions.service";
import type { CreateTransactionsDTO } from "../dtos/transactions.dto";

export class TransactionsController {
	constructor(private categoriesService: TransactionsService) {}
	create = async (
		req: Request<unknown, unknown, CreateTransactionsDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { title, amount, categoryId, date, type } = req.body;

			const result = await this.categoriesService.create({ title, amount, categoryId, date, type });

			return res.status(StatusCodes.CREATED).json(result);
		} catch (error) {
			next(error);
		}
	}
}

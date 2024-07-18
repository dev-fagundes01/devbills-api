import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type {
	CreateTransactionsDTO,
	GetDashboardDTO,
	IndexTransactionsDTO,
} from "../dtos/transactions.dto";
import type { TransactionsService } from "../services/transactions.service";

export class TransactionsController {
	constructor(private transactionsService: TransactionsService) {}
	create = async (
		req: Request<unknown, unknown, CreateTransactionsDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { title, amount, categoryId, date, type } = req.body;

			const result = await this.transactionsService.create({
				title,
				amount,
				categoryId,
				date,
				type,
			});

			return res.status(StatusCodes.CREATED).json(result);
		} catch (error) {
			next(error);
		}
	};

	index = async (
		req: Request<unknown, unknown, unknown, IndexTransactionsDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { title, categoryId, beginDate, endDate } = req.query;

			const result = await this.transactionsService.index({
				title,
				categoryId,
				beginDate,
				endDate,
			});

			return res.status(StatusCodes.OK).json(result);
		} catch (error) {
			next(error);
		}
	};

	getDashboard = async (
		req: Request<unknown, unknown, unknown, GetDashboardDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { beginDate, endDate } = req.query;

			const result = await this.transactionsService.getDashboard({
				beginDate,
				endDate,
			});

			return res.status(StatusCodes.OK).json(result);
		} catch (error) {
			next(error);
		}
	};
}

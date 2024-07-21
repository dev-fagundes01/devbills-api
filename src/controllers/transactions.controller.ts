import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type {
	CreateTransactionsDTO,
	GetDashboardDTO,
	GetFinancialEvolutionDTO,
	IndexTransactionsDTO,
} from "../dtos/transactions.dto";
import type { TransactionsService } from "../services/transactions.service";
import type { BodyRequest, QueryRequest } from "./types";

export class TransactionsController {
	constructor(private transactionsService: TransactionsService) {}
	create = async (
		req: BodyRequest<CreateTransactionsDTO>,
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
		req: QueryRequest<IndexTransactionsDTO>,
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
		req: QueryRequest<GetDashboardDTO>,
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

	getFinancialEvolution = async (
		req: QueryRequest<GetFinancialEvolutionDTO>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { year } = req.query;

			const result = await this.transactionsService.getFinancialEvolution({
				year
			});

			return res.status(StatusCodes.OK).json(result);
		} catch (error) {
			next(error);
		}
	};
}

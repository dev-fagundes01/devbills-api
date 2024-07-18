import type { IndexTransactionsDTO } from "../../dtos/transactions.dto";
import type { Transaction } from "../../entities/transactions.entity";
import type { TransactionModel } from "../schemas/transactions.schema";

export class TransactionsRepository {
	constructor(private model: typeof TransactionModel) {}

	async create({
		title,
		date,
		amount,
		type,
		category,
	}: Transaction): Promise<Transaction> {
		const createdTransactions = await this.model.create({
			title,
			date,
			amount,
			type,
			category,
		});

		console.log("Created transactions:", createdTransactions);

		return createdTransactions.toObject<Transaction>();
	}

	async index({
		title = "",
		categoryId,
		beginDate,
		endDate,
	}: IndexTransactionsDTO): Promise<Transaction[]> {
		const whereParams: Record<string, unknown> = {
			...(title && { title: { $regex: title, $options: "i" } }),
			...(categoryId && { "category._id": categoryId }),
		};
		
		if (beginDate || endDate) {
			whereParams.date = {
				...(beginDate && { $gte: beginDate }),
				...(endDate && { $gte: endDate }),
			};
		}

		console.log(whereParams);

		const transactions = await this.model.find(whereParams);

		const transactionsMap = transactions.map((item) =>
			item.toObject<Transaction>(),
		);

		return transactionsMap;
	}
}

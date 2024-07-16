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
		const createdCategory = await this.model.create({
			title,
			date,
			amount,
			type,
			category,
		});
		
		return createdCategory.toObject<Transaction>();
	}

	async index(): Promise<Transaction[]> {
		const categories = await this.model.find();
		const categoriesMap = categories.map((item) =>
			item.toObject<Transaction>(),
		);

		return categoriesMap;
	}
}

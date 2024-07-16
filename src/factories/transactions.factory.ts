import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { TransactionModel } from "../database/schemas/transactions.schema";
import { TransactionsService } from "../services/transactions.service";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TransactionsFactory {
	private static transactionsService: TransactionsService;

	static getServiceInstance() {
    if(TransactionsFactory.transactionsService) {
      return TransactionsFactory.transactionsService;
    }

		const repository = new TransactionsRepository(TransactionModel);
    const categoriesRepository = new CategoriesRepository(CategoryModel)
		const service = new TransactionsService(repository, categoriesRepository);

		TransactionsFactory.transactionsService = service;

		return service;
	}
}

import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CategoriesService } from "../services/categories.service";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class CategoriesFactory {
	private static categoriesService: CategoriesService;

	static getServiceInstance() {
		if (CategoriesFactory.categoriesService) {
			return CategoriesFactory.categoriesService;
		}

		const repository = new CategoriesRepository(CategoryModel);
		const service = new CategoriesService(repository);

		CategoriesFactory.categoriesService = service;

		return service;
	}
}

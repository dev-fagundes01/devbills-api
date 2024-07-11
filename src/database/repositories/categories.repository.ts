import type { Category } from "../../entities/category.entity";
import type { CategoryModel } from "../schemas/category.schema";

export class CategoriesRepository {
	constructor(private model: typeof CategoryModel) {}

	async create({ title, color }: Category): Promise<Category> {
		const createdCategory = await this.model.create({ title, color });
		console.log('Created Category:', createdCategory)
		return createdCategory.toObject<Category>();
	}
}

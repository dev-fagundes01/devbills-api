import { z } from "zod";

export const CreateCategorySchema = {
	title: z.string(),
	color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
};

const CreateCategoryObject = z.object(CreateCategorySchema);
export type CreateCategoryDTO = z.infer<typeof CreateCategoryObject>;

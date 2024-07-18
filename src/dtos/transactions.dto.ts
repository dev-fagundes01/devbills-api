import { z } from "zod";
import { TransactionType } from "../entities/transactions.entity";

export const createTransactionsSchema = {
  title: z.string(),
  amount: z.number().int().positive(),
  type: z.nativeEnum(TransactionType),
  date: z.coerce.date(),
  categoryId: z.string().length(24),
}

const createTransactionsObject = z.object(createTransactionsSchema);
export type CreateTransactionsDTO = z.infer<typeof createTransactionsObject>;

export const indexTransactionsSchema = {
	title: z.string().optional(),
  categoryId: z.string().length(24).optional(),
  beginDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
}

const indexTransactionsObject = z.object(indexTransactionsSchema);
export type IndexTransactionsDTO = z.infer<typeof indexTransactionsObject>;

export const getDashboardSchema = {
  beginDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
}

const getDashboardObject = z.object(getDashboardSchema);
export type GetDashboardDTO = z.infer<typeof getDashboardObject>;
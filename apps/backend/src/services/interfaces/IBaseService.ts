import { Context } from "../../context";

export interface IBaseService<T> {
  getById(id: number, context: Context): Promise<T | null>;
  getAll(context: Context): Promise<T[]>;
  create(data: Partial<T>, context: Context): Promise<T>;
  update(id: number, data: Partial<T>, context: Context): Promise<T>;
  delete(id: number, context: Context): Promise<void>;
}

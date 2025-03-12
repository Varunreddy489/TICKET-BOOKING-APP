import { StatusCodes } from "http-status-codes";
import { PrismaClient, Prisma } from "@prisma/client";

import { logger } from "../config";
import AppError from "../utils/errors/app.error";

class CrudRepository<
  T extends {
    create: Function;
    findUnique: Function;
    findMany: Function;
    update: Function;
    delete: Function;
  }
> {
  protected model: T;

  constructor(model: T) {
    this.model = model;
  }

  async create(data: any) {
    try {
      const response = await this.model.create({ data });
      return response;
    } catch (error) {
      logger.error("Error in CrudRepository create:", error);
      throw new AppError("Failed to create resource", StatusCodes.BAD_REQUEST);
    }
  }

  async get(id: number, include?: any, select?: any) {
    try {
      const response = await this.model.findUnique({
        where: { id },
        include,
        select,
      });
      if (!response) {
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      logger.error("Error in CrudRepository get:", error);
      throw error;
    }
  }

  async getAll(include?: any, select?: any) {
    try {
      const response = await this.model.findMany({ include, select });
      return response;
    } catch (error) {
      logger.error("Error in CrudRepository getAll:", error);
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.model.update({ where: { id }, data });
      return response;
    } catch (error) {
      logger.error("Error in CrudRepository update:", error);
      throw new AppError("Failed to update resource", StatusCodes.BAD_REQUEST);
    }
  }

  async destroy(id: number) {
    try {
      const response = await this.model.delete({ where: { id } });
      return response;
    } catch (error: any) {
      logger.error("Error in CrudRepository destroy:", error);
      if (error.code === "P2025") {
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
      }
      throw error;
    }
  }
}

export default CrudRepository;

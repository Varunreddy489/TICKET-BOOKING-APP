import { prisma } from "../config";
import CrudRepository from "./crud.repository";

class ReviewRepository extends CrudRepository<typeof prisma.review> {
  constructor() {
    super(prisma.review);
  }
}

export default ReviewRepository;

import { prisma } from "../config";

import CrudRepository from "./crud.repository";

class MovieRepository extends CrudRepository<typeof prisma.movie> {
  constructor() {
    super(prisma.movie);
  }
}

export default MovieRepository;

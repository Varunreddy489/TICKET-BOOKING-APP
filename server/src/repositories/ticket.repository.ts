import { prisma } from "../config";

import CrudRepository from "./crud.repository";

class TicketRepository extends CrudRepository<typeof prisma.ticket> {
  constructor() {
    super(prisma.ticket);
  }
}

export default TicketRepository;

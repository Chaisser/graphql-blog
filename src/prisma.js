import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";
const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "",
  secret: "SECRET",
  fragmentReplacements,
});

export default prisma;

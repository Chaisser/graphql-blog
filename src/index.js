import { GraphQLServer } from "graphql-yoga";
import { resolvers, fragmentReplacements } from "./resolvers/index";
import prisma from "./prisma";
import { googleStorageKeyGenerator } from "./utils/googleStorageKeyGenerator";
import imageRouter from "./routers/imageRouter";
googleStorageKeyGenerator();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

server.express.use(imageRouter);

server.start(() => {
  console.log("The server is up!");
});

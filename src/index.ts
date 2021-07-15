import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const fastify = Fastify({ logger: true });
const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();

fastify.get("/", async (_, reply) => {
  reply.send("Hello");
});

const start = async () => {
  try {
    await fastify.listen(PORT, "0.0.0.0");
    fastify.log.info(
      `Fastify server running on port ${PORT} in ${
        process.env.NODE_ENV || "development"
      }`
    );
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start().finally(async () => {
  await prisma.$disconnect();
});

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { loadConfig } from "./common/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = loadConfig();
  // Explicit "0.0.0.0" — without it, Node listens on IPv6-only by default in
  // some container environments, and Fly.io's proxy (which health-checks over
  // IPv4) can't reach the process even though it's genuinely listening.
  // Confirmed via an actual Fly.io deploy (same class of bug as the Vite dev
  // server fix in vite.config.ts).
  await app.listen(config.port, "0.0.0.0");

  Logger.log(
    `kpopschool-portfolio server listening on :${config.port} (INTEGRATION_MODE=${config.integrationMode})`,
    "Bootstrap",
  );
}

bootstrap();

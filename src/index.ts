import * as express from "express";

import { version } from "../package.json";
import { config } from "./config";
import { logger } from "./logger";

const app = express();

app.get("/health", (req, res) => res.send(""));
app.get("/version", (req, res) => res.send(packageJson.version));

app.listen(config.port, () => {
    logger.info(`listening on port ${config.port}`);
});

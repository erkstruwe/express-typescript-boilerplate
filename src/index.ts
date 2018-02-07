import * as express from "express";

import { config } from "./config";
import { logger } from "./logger";
import { version } from "../package.json";

const app = express();

app.get('/health', (req, res) => res.send(''));
app.get('/version', (req, res) => res.send(version));

app.listen(config.port, () => {
    logger.info(`listening on port ${config.port}`);
});

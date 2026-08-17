#!/usr/bin/env node

import createApp from "./server.js";
import parseSettings from "./settingsLoader.js";

export const { port, schemas } = await parseSettings();

const app = createApp(schemas);

app.listen(port, () => {
  console.log(`Jumble API is listening to port ${port}...`);
});

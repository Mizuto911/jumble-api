#!/usr/bin/env node

import app from "./server.js";
import { port } from "./server.js";

app.listen(port, () => {
  console.log(`Jumble API is listening to port ${port}...`);
});

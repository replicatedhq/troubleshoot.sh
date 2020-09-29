const fs = require("fs");

// Create ENV file for runtime access
fs.writeFileSync("./.env.production",
  `GATSBY_GA_TRACKING_ID=${process.env.GA_TRACKING_ID}\nGATSBY_MATOMO_SITE_ID=${process.env.MATOMO_SITE_ID}`
);

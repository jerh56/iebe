import config from "./common/config/env.config.js";
import express from "express";
import bodyParser from "body-parser";
import * as AuthorizationRouter from "./authorization/routes.config.js";
import * as Users from "./users/routes.config.js";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
Users.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});

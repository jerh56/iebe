import * as VerifyUserMiddleware from "./middlewares/verify.user.middleware.js";
import * as AuthorizationController from "./controllers/authorization.controller.js";
import * as AuthValidationMiddleware from "../common/middlewares/auth.validation.middleware.js";
export const routesConfig = (app) => {
  app.post("/auth", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login,
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login,
  ]);
};

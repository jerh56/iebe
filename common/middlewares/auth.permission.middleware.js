import jwt from "jsonwebtoken";
//import config from '../config/env.config')
//const ['jwt_secret'];

const ADMIN_PERMISSION = 4096;

export function minimumPermissionLevelRequired(required_permission_level) {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt.userId;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
}

export function onlySameUserOrAdminCanDoThisAction(req, res, next) {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export function sameUserCantDoThisAction(req, res, next) {
  let userId = req.jwt.userId;

  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
}

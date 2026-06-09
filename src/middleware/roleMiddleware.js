export const requireRole = (roles = []) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user || !req.user.categary) {
      return res.status(403).json({ message: "User role not found" });
    }

    if (!allowedRoles.includes(req.user.categary)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};


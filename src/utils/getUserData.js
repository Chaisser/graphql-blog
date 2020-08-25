import jwt from "jsonwebtoken";

const getUserData = (request, requireAuth = true, requireAdmin = false) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userType = decoded.userType;

    if (requireAdmin) {
      if (userType !== "ADMIN") {
        throw new Error("Yönetici yetkisi gereklidir");
      }
    }
    return { id: decoded.id, userType: decoded.userType };
  }

  if (requireAuth) {
    throw new Error("Üyelik gerektirir");
  }

  return null;
};

export default getUserData;

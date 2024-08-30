import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = async(user: any) => {
  try {
    const token = jwt.sign({ user }, process.env.SECRET_KEY as string, {
      expiresIn: "24h",
    });
    return token;
  } catch (error: any) {
    return { status: 500, messag: `Error: ${error.message} happened` };
  }
};

export const decodeToken = (token: string) => {
  if (typeof token !== "string") {
    return null;
  }

  try {
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    return decoded.user;
  } catch (error) {
    return null;
  }
};

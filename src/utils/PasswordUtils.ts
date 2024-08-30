import bcrypt from "bcrypt";

export const hashingPassword = async (password: any) => {
  const salt = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return error;
  }
};

export const comparePassword = async (
  password: string,
  userPassword: string
) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error: any) {
    throw new Error(`Error login: ${error.message}`);
  }
};

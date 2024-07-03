import bcrypt from "bcrypt";

export const hashPassword = async (password: string, saltRound: number) => {
  const salt = await bcrypt.genSaltSync(saltRound);
  const hashPwd = await bcrypt.hashSync(password, salt);
  return hashPwd;
};

export const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compareSync(password, hash);
};

import users from "./users.json";

export const getAvatarFromEmail = (email) => {
  const userOjb = users?.filter((user) => user.email === email);
  return { image: userOjb[0]?.avatar, name: userOjb[0].name };
};

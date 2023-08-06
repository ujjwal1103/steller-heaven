export const findFriend = (p, u) => {
  const friend = p?.find((pa) => pa._id !== u);
  return friend;
};

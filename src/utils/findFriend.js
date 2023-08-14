export const findFriend = (p, u) => {
  const friend = p?.find((pa) => pa._id !== u);
  return friend;
};


export const capitalizeFirstLetters = inputString => {
  const words = inputString.split(" ");

  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1);
    } else {
      return word;
    }
  });

  const resultString = capitalizedWords.join(" ");

  return resultString;
};




export const isValidIndianPincode=(pincode)=> {
    // Regular expression to match a valid Indian PIN code
    const pincodeRegex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
  
    // Check if the input matches the regex pattern
    return pincodeRegex.test(pincode);
}


export function containsOnlyEmojis(text) {
    const emojiPattern = /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;
    return emojiPattern.test(text);
  }
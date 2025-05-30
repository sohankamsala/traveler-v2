import removeTextBetweenAsterisks from "./RemoveRP";

function removeUnwantedChars(input: string): string {
    
    return removeTextBetweenAsterisks(input.substring(2)).replace("*", "").replace(".", ""); // Remove the first 3 characters
    console.log("removing")
  }

export default removeUnwantedChars
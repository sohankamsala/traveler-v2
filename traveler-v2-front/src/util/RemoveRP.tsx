function removeTextBetweenAsterisks(text: any) {
  const regex = /\*[^*]*\*/g;

  return text.replace(regex, "");
}

export default removeTextBetweenAsterisks;

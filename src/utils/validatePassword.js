const validatePassword = (password) => {
  const passwordLengthRegex = /^.{6,}$/;
  const passwordContainsLetterRegex = /[A-Za-z]/;
  const passwordContainsNumberRegex = /\d/;
  const passwordContainsSpecialCharsRegex = /[@&_*$]/; // Allow only '_', '@', '&', or '*' as special characters

  const isValidLength = passwordLengthRegex.test(password);
  const containsLetter = passwordContainsLetterRegex.test(password);
  const containsNumber = passwordContainsNumberRegex.test(password);
  const containsSpecialChars = passwordContainsSpecialCharsRegex.test(password);

  let passwordError = "";
  if (!isValidLength) {
    passwordError = "Password must be at least 6 characters long.";
  } else if (!containsLetter) {
    passwordError = "Password must contain at least one letter.";
  } else if (!containsNumber) {
    passwordError = "Password must contain at least one number.";
  } else if (!containsSpecialChars) {
    passwordError =
      "Password must only contain '_', '@', '&', or '*' as special characters.";
  }

  return passwordError;
};

export default validatePassword;

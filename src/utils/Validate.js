// Form Validation Utility Functions
export const checkValidation = (name, email, password) => {
  const nameRegex = /^[a-zA-Z0-9_\s]+/.test(name);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/.test(
    password
  );

  if (!nameRegex)
    return "Name can only contain letters, numbers, and underscores";
  if (!emailRegex) return "Email is invalid";
  if (!passwordRegex)
    return "Password must be at least 8 characters long and contain at least one letter and one number";

  return null;
};

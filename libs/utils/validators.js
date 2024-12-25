export const validateJSON = (json) => {
  try {
    if (!json || typeof json !== "object") {
      return false;
    }

    return Object.keys(json).length > 0;
  } catch {
    return false;
  }
};

export const Response = (res, message, data, code = 0) => {
  res.json({ message, data, code });
};

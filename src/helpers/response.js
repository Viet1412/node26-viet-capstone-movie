const respone = (payload, ...rest) => {
  return {
    status: "success",
    data: payload,
    ...rest,
  };
};

module.exports = respone;

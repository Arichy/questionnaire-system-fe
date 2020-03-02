import instance from "./http";

export default opts => {
  let result = {};
  for (const [key, { url, method = "get" }] of Object.entries(opts)) {
    result[key] = params =>
      new Promise((resolve, reject) =>
        instance({
          url,
          method,
          [method.toLowerCase() === "get" ? "params" : "data"]: params,
        })
          .then(res => resolve(res.data))
          .catch(err => reject(err)),
      );
  }

  return result;
};

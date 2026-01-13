export const health = async () => {
  const resp = await fetch("https://collectorium-api.onrender.com/health");

  return resp.status;
};

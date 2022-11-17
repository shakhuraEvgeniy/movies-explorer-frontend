import { MOVIES_URL } from "./constants";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getAllMovies = async () => {
  const res = await fetch(`${MOVIES_URL}/`, {
    method: "GET",
  });
  return await checkResponse(res);
};

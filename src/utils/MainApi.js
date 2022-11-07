import { MAIN_URL } from "./constants";

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  return Promise.reject(err);
};

export const register = async (email, password, name) => {
  const res = await fetch(`${MAIN_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  return await checkResponse(res);
};

export const auth = async (email, password) => {
  const res = await fetch(`${MAIN_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await checkResponse(res);
};

export const logout = async () => {
  const res = await fetch(`${MAIN_URL}/signout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await checkResponse(res);
};

export const getUser = async () => {
  const res = await fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await checkResponse(res);
};

export const updateUser = async (email, name) => {
  const res = await fetch(`${MAIN_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  });
  return await checkResponse(res);
};

export const getSavedMovie = async () => {
  const res = await fetch(`${MAIN_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await checkResponse(res);
};

export const changeLikedMovieStatus = async ({
  _id,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail = "http://nomoreparties.co/beatfilm-movies/notFound",
  movieId,
  nameRU,
  nameEN,
  isLiked,
}) => {
  if (isLiked) {
    const res = await fetch(`${MAIN_URL}/movies/${_id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await checkResponse(res);
  } else {
    const res = await fetch(`${MAIN_URL}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
    return await checkResponse(res);
  }
};

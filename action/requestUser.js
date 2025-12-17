import axios from "axios";

export const RegisterRequest = async (data) => {
  try {
    const response = await fetch(
      "https://stripe-izin.onrender.com/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const LoginRequest = async (data) => {
  try {
    const response = await fetch(
      "https://stripe-izin.onrender.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

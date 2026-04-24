import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchUsers = async () => {
  const response = await api.get("/users", {
    params: {
      limit: 100,
      skip: 0,
    },
  });

  return response.data.users ?? [];
};

export const fetchOrders = async () => {
  const response = await api.get("/carts", {
    params: { limit: 10 },
  });

  return response.data.carts ?? [];
};

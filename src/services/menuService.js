import api from "../lib/api";

export const fetchMenusByCanteen = async (canteenId) => {
  const { data } = await api.get("/menus", { params: { canteen_id: canteenId } });
  return data?.data ?? [];
};

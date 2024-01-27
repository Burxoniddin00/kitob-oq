import { create } from "zustand";

export const useStore = create((set) => ({
  data: {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  },
  setData: (newData) =>
    set((state) => {
      const updatedData = { ...state.data, ...newData };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return { data: updatedData };
    }),
}));
import create from "zustand";

const useStore = create((set) => ({
  hello: "hello",
  setHello: () => set((state) => ({ hello: state })),
}));

export { useStore };

import create from "zustand";

const useStore = create((set) => ({
  pageTitle: null,
  setPageTitle: (e) => set(() => ({ pageTitle: e })),
}));

export { useStore };

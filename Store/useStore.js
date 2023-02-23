import create from "zustand";
import { v4 as uuidv4 } from "uuid";

const useStore = create((set) => ({
  /* язык сайта */
  lang: "ru",
  setLang: (e) => set(() => ({ lang: e })),
  /* название страницы */
  pageTitle: null,
  setPageTitle: (e) => set(() => ({ pageTitle: e })),
  /* черное лого, белое лого */
  blackLogo: false,
  setBlackLogo: (e) => set(() => ({ blackLogo: e })),
  /* виден ли верхний бар */
  barIsVisible: true,
  setBarIsVisible: (e) => set(() => ({ barIsVisible: e })),
  /* открыта ли правая навигация */
  navIsOpened: false,
  setNavIsOpened: (e) => set(() => ({ navIsOpened: e })),
  /* стэйт должна ли быть галерея анимированной */
  animatedGallery: true,
  setAnimatedGallery: (e) => set(() => ({ animatedGallery: e })),
  /* */
  searchPanel: false,
  showSearchPanel: (e) => set(() => ({ searchPanel: e })),
  /* */
  logId: uuidv4(),
  setLogId: () => set({ logId: uuidv4() }),
}));

export { useStore };

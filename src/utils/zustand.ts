import { create } from "zustand";

interface ModalStateType {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
  toggle: () => void;
}

export const modalState = create<ModalStateType>((set) => ({
  open: false,
  setOpen: () => set(() => ({ open: true })),
  setClose: () => set(() => ({ open: false })),
  toggle: () => set((state) => ({ open: state.open ? false : true })),
}));

interface DataIdLoadedType {
  id: null | number;
  setId: (arg: number) => void;
  clearId: () => void;
}

export const dataIdLoaded = create<DataIdLoadedType>((set) => ({
  id: null,
  setId: (newId) => set(() => ({ id: newId })),
  clearId: () => set(() => ({ id: null })),
}));

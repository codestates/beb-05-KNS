import create from 'zustand';

export const stateIsLogin = create((set) => ({
    isLogin: null,
    setIsLogin: (bState) => set({ bState }),
  }));
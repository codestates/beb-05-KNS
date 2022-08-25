import create from 'zustand';

export const useIsLogin = create((set) => ({
  isLogin: null,
  setIsLogin: (bState) => set({ bState }),
}));

export const useUserInfo = create((set) => ({
  userInfo: null,
  setUserInfo: (user) => set({ user }),
}));

export const usePostList = create((set) => ({
  postList: null,
  setPostList : (postList) => set({ postList }),
}));

export const useNftList = create((set) => ({
  nftList: null,
  setNftList: (nftList) => set({ nftList }),
}));

export const useMyNftList = create((set) => ({
  myNftList: null,
  setMyNftList: (myNftList) => set({ myNftList }),
}));

export const useMyPostList = create((set) => ({
  myPostList: null,
  setMyPostList : (postList) => set({ postList }),
}));
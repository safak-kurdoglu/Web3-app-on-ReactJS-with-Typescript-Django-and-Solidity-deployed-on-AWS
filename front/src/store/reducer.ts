import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NFTsState {
  NFTstoShow: object[],
  NFTsonSale: object[],
  isNFTWaiting: boolean,
  isNFTFighting: boolean,
  strikes: number[],
  NFTF: object,
  NFTS: object,
  firstStriker: number,
  message: string,
}

const initialState: NFTsState = {
  NFTstoShow: [],
  NFTsonSale: [],
  isNFTWaiting: false,
  isNFTFighting: false,
  strikes: [],
  NFTF: {},
  NFTS: {},
  firstStriker: -1,
  message: ""
}

export const slice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setNFTsToShow: (state, action: PayloadAction<object[]>) => {
      state.NFTstoShow = action.payload
    },
    setNFTsOnSale: (state, action: PayloadAction<object[]>) => {
      state.NFTsonSale = action.payload
    },
    isNFTWaiting: (state, action: PayloadAction<boolean>) => {
      state.isNFTWaiting = action.payload
    },
    isNFTFighting: (state, action: PayloadAction<boolean>) => {
      state.isNFTFighting = action.payload
    },
    setStrikes: (state, action: PayloadAction<number[]>) => {
      state.strikes = action.payload
    },
    setNFTF: (state, action: PayloadAction<object>) => {
      state.NFTF = action.payload
    },
    setNFTS: (state, action: PayloadAction<object>) => {
      state.NFTS = action.payload
    },
    setFirstStriker: (state, action: PayloadAction<number>) => {
      state.firstStriker = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
});

export const { setNFTsToShow, setNFTsOnSale, isNFTWaiting, isNFTFighting, setStrikes, setNFTF, setNFTS, setFirstStriker, setMessage } = slice.actions

export default slice.reducer

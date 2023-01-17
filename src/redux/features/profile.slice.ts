import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IDistrict, IProvince, IWard } from "types/profile.model";

export interface ProfileState {
  provinceList: IProvince[];
  districtList: IDistrict[];
  wardList: IWard[];
  uploadedImg: string;
  uploadedLoading: boolean;
  loading: boolean;
}

const initialState: ProfileState = {
  provinceList: [],
  districtList: [],
  wardList: [],
  uploadedImg: "",
  uploadedLoading: false,
  loading: false
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProvinceActionRequest: (state: ProfileState) => ({
      ...state,
      loading: true
    }),
    getProvinceActionComplete: (
      state: ProfileState,
      action: PayloadAction<IProvince[]>
    ) => ({
      ...state,
      loading: false,
      provinceList: action.payload
    }),
    getDistrictActionRequest: (
      state: ProfileState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      loading: true
    }),
    getDistrictActionComplete: (
      state: ProfileState,
      action: PayloadAction<IDistrict[]>
    ) => ({
      ...state,
      loading: false,
      districtList: action.payload
    }),
    getWardActionRequest: (
      state: ProfileState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      loading: true
    }),
    getWardActionComplete: (
      state: ProfileState,
      action: PayloadAction<IWard[]>
    ) => ({
      ...state,
      loading: false,
      wardList: action.payload
    }),
    uploadImageActionRequest: (
      state: ProfileState,
      action: PayloadAction<FormData>
    ) => ({
      ...state,
      uploadedLoading: true
    }),
    uploadImageActionComplete: (
      state: ProfileState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      uploadedLoading: false,
      uploadedImg: action.payload
    }),
    resetAfterChangeAvatar: (state: ProfileState) => ({
      ...state,
      uploadedImg: ""
    })
  }
});

export const {
  getProvinceActionRequest,
  getProvinceActionComplete,
  getDistrictActionRequest,
  getDistrictActionComplete,
  getWardActionRequest,
  getWardActionComplete,
  uploadImageActionRequest,
  uploadImageActionComplete,
  resetAfterChangeAvatar
} = profileSlice.actions;

export default profileSlice.reducer;

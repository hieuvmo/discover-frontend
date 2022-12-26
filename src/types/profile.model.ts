export interface IProvince {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface IDistrict {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}

export interface IWard {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

export interface IProfile {
  _id?: string;
  userId?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  dob: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  updatedAt?: string;
}

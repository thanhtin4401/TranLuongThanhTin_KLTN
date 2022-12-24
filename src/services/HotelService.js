import { httpsKLTN } from './axiosClientKLTN';

export let hotelService = {
  getAllHotel: () => {
    return httpsKLTN.get(`/api/khachsan`);
  },
  deleteHotel: (id) => {
    return httpsKLTN.delete(`/api/khachsan/${id}`);
  },
  updateHotel: (id, formData) => {
    return httpsKLTN.post(`/api/khachsan/${id}`, formData);
  },
  postHotel: (formData) => {
    return httpsKLTN.post(`/api/khachsan/`, formData);
  },
};

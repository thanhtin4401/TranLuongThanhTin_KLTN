import { httpsKLTN } from './axiosClientKLTN';

export const billServices = {
  createBill: (data) => {
    return httpsKLTN.post(`/api/hoadon`, data);
  },
};

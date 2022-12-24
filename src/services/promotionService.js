import { https } from './axiosClient';
import { httpsKLTN } from './axiosClientKLTN';

export let promotionService = {
  getAllPromotion: () => {
    return httpsKLTN.get(`/api/khuyenmai`);
  },
  postPromotion: (promotionInfor) => {
    return httpsKLTN.post(`/api/khuyenmai`, promotionInfor);
  },
  deletePromotion: (id) => {
    return httpsKLTN.delete(`/api/khuyenmai/${id}`);
  },
  putPromotion: (id, promotionInfor) => {
    return httpsKLTN.put(`/api/khuyenmai/${id}`, promotionInfor);
  },
  getPromotionById: (id) => {
    return httpsKLTN.get(`/api/khuyenmai/${id}`);
  },
};

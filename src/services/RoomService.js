import { https } from './axiosClient';
import { httpsKLTN, formDataRequest } from './axiosClientKLTN';

export let roomService = {
  getRoomLocation: (id) => {
    return https.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  getOderRoom: () => {
    return https.get(`/api/dat-phong`);
  },
  getOderRoomById: (idUser) => {
    return https.get(`/api/dat-phong/lay-theo-nguoi-dung/${idUser}`);
  },
  deleteOrderRoom: (idRoom) => {
    return https.delete(`/api/dat-phong/${idRoom}`);
  },
  bookingRoom: (data) => {
    return https.post('/api/dat-phong', data);
  },
  getRoomList: () => {
    return https.get(`api/phong-thue`);
  },
  getsearchRoom: (tenPhong) => {
    return https.get(
      `api/phong-thue/phan-trang-tim-kiem?pageIndex=1&pageSize=1&keyword=${tenPhong}`
    );
  },
  getALlRoom: (id) => {
    return httpsKLTN.get(`/api/khachsan/${id}/phong`);
  },
  deleteRoom: (id) => {
    return httpsKLTN.delete(`/api/phong/${id}`);
  },
  getDetailRoom: (id) => {
    return httpsKLTN.get(`/api/phong/${id}`);
  },
  postRoom: (roomData) => {
    return formDataRequest.post(`/api/phong/`, roomData);
  },
  postImage: (data) => {
    return formDataRequest.post('/api/phong/image/create', data);
  },
  getAllTypeRoom: () => {
    return httpsKLTN.get(`/api/loaiphong`);
  },

  putRoom: (id, data) => {
    return formDataRequest.put(`/api/phong/${id}`, data);
  },
};

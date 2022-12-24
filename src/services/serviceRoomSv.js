import { https } from './axiosClient';
import { httpsKLTN } from './axiosClientKLTN';

export let serviceRoomSv = {
  getALlService: () => {
    return httpsKLTN.get(`/api/dichvu`);
  },
};

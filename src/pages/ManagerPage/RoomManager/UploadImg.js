import React from 'react';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { roomService } from '../../../services/RoomService';

const defaultImagePath = "img/phong/16710964908161670943139002blake-wisz-TcgASSD5G04-unsplash.jpg";

const UploadImgRoom = ({ ID, imgRoom, handleOnSuccess }) => {
  let imageUrl = defaultImagePath;
  if (imgRoom) {
    imageUrl = imgRoom.url;
  }

  const [imgSRC, setimgSRC] = useState('');
  const [file, setfile] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const openModalClick = () => {
    setOpenModal(true);
  };
  const handleOk = () => {
    setOpenModal(false);
    const formData = new FormData();
    formData.append('formFile', file);
    roomService
      .uploadImgRoom(ID, formData)
      .then((res) => {
        message.success('cap nhat anh thanh cong');
        handleOnSuccess();
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg'
    ) {
      setfile(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setimgSRC(e.target.result);
      };
    }
  };

  return (
    <>
      <div className="space-5 flex relative">
        <img
          className="w-full h-[100px] rounded-[0.5rem] object-cover"
          src={`http://localhost:8000/${imageUrl}`}
        />
        <button
          onClick={openModalClick}
          className="py-[6px] px-[12px] bg-black text-white rounded-lg absolute left-0 w-full bottom-0 h-full opacity-0 hover:opacity-60 transition-all"
        >
          upload
        </button>
      </div>
      <Modal className="modalUploadImg" open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <h1 className="text-base font-bold mb-5">Chọn hình ảnh:</h1>
        <img
          className="w-[150px] h-[150px] rounded-[0.5rem] mb-2 object-cover"
          src={imgSRC === '' ? imgRoom : imgSRC}
          alt=""
        />
        <input
          type="file"
          className="file:bg-[#1c305e] file:border-none file:px-3 file:py-2 file:rounded-full file:text-white file:cursor-pointer rounded-full"
          name="img"
          onChange={handleChangeFile}
        />
      </Modal>
    </>
  );
};

export default UploadImgRoom;

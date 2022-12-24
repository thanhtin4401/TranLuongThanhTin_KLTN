import { Modal, message } from 'antd';
import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './ActionRoom.scss';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../redux/manager/user';
import UpdateRoomPage from './UpdateRoomPage';
import { useTranslation } from 'react-i18next';
import { roomService } from '../../../services/RoomService';
export default function ActionRoom({ ID, roomInfor, handleOnSuccess }) {
  const { t } = useTranslation();

  let handleUserDelete = () => {
    Modal.destroyAll();
  };

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleComfirm = (id) => {
    setOpen(false);
    roomService
      .deleteRoom(id)
      .then((res) => {
        message.success('xoa thanh cong');
        handleOnSuccess();
        setIsModalOpen(false);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="space-x-2 flex justify-center">
      <button
        onClick={handleShowModal}
        className="border rounded text-white  bg-[#1aa293] hover:bg-[#84f1e5] transition-all p-[0.5rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <button
        onClick={showModal}
        className="border rounded text-white  bg-[#f96d77] hover:bg-[#fcacb1] transition-all p-[0.5rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Modal
        className="modal-confirm-delete"
        title="Modal"
        open={open}
        onOk={() => handleComfirm(ID)}
        onCancel={hideModal}
        okText="comfirm"
        cancelText="cancle"
      >
        <h1 className="">
          {t('Are you sure you want to delete room: ')}
          {roomInfor?.room}
        </h1>
      </Modal>
      <UpdateRoomPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        ID={ID}
        roomInfor={roomInfor}
        handleOnSuccessUpdate={handleOnSuccess}
      />
    </div>
  );
}

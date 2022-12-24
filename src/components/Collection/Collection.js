import React, { useState } from 'react';
import { Modal, notification } from 'antd';
export default function Collection() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal className="modalUploadImg" open={isOpenModal} onOk={handleOk} onCancel={handleCancel}>
        <h1 className="text-base font-bold mb-5">Rất tiếc, hãy quay lại sau để trải nghiệm nhé?</h1>
      </Modal>
      <div className="flex gap-5 overflow-x-auto">
        <div className="relative lg:w-[680px] md:w-full sm:w-full mb:w-full h-[370px]  animate__animated animate__fadeInLeft">
          <img
            className="absolute rounded-xl object-cover w-full h-full"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/travel-banner-design-template-0bda6397d7a8f994ca8b5eed8c1d8dd4_screen.jpg?ts=1636814789"
            alt=""
          />
          <div className="absolute top-5 left-10 ">
            <h1 className="  font-medium text-white ">Collection</h1>
            <h1 className=" font-bold text-white text-2xl w-52">
              Connect with Olympians & Paralympians
            </h1>
          </div>
          <div className="absolute bottom-10 left-10">
            <button onClick={openModal} className="py-2 px-5 bg-white font-medium rounded">
              Show All
            </button>
          </div>
        </div>
        <div className="w-[680px] h-[370px] relative md:hidden sm:hidden mb:hidden lg:block animate__animated animate__fadeInRight">
          <img
            className="absolute rounded-xl object-cover w-full h-full"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/tour-and-travel-banner-post-design-template-c296c746b80fb732cf24f15e06b80a5e_screen.jpg?ts=1623069897"
            alt=""
          />
          <div className="absolute top-5 left-10">
            <h1 className="  font-medium text-white">Collection</h1>
            <h1 className=" font-bold text-white text-2xl w-52">
              Connect with Olympians & Paralympians
            </h1>
          </div>
          <div className="absolute bottom-10 left-10">
            <button onClick={openModal} className="py-2 px-5 bg-white font-medium rounded">
              Show All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

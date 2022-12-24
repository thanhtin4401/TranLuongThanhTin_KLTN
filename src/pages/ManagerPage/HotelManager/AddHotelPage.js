import React, { useEffect, useState } from 'react';

import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Col,
  Row,
  InputNumber,
  Checkbox,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './AddHotelPage.scss';
import { locationService } from '../../../services/locationService';
import { roomService } from '../../../services/RoomService';
import { hotelService } from '../../../services/HotelService';
function AddRoomPage({ setIsModalOpen, isModalOpen, handleOnSuccess }) {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const onFinish = (values) => {
    const infor = {
      'KhachSan[TenKhachSan]': values.TenKhachSan,
      'KhachSan[TieuDe]': values.TieuDe,
      'KhachSan[MucGiaPhong]': values.MucGiaPhong,
      'KhachSan[DanhGia]': values.DanhGia,
      'KhachSan[DiaChi]': values.DiaChi,
    };
    console.log(infor);
    hotelService
      .postHotel(infor)
      .then((res) => {
        message.success('them thanh cong');
        handleOnSuccess();
        setIsModalOpen(false);
        return res;
      })
      .catch((err) => {
        message.success('them thanh cong');
        console.log(err);
      });
  };
  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    locationService
      .getLocationList()
      .then((res) => {
        setLocationList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onFinishFailed = (errorInfo) => {};

  const { Option } = Select;

  const { t } = useTranslation();

  const auth = useSelector((state) => state.auth);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={t('Add Room')}
      open={isModalOpen}
      className="modal_add-room"
      onCancel={handleCancel}
    >
      <div className=" w-full flex justify-center items-center">
        <div className="w-full ">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex w-full justify-between">
              <div className="w-2/4 pr-6 border-r-[1px]">
                <h2 className="font-[600] text-[1rem] text-[#1c305e] ">Thông tin chung</h2>
                <p className="">{t('Tên Khách Sạn')}</p>
                <Form.Item
                  className="mb-4"
                  name="TenKhachSan"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your Room!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                    placeholder="Tên phòng"
                  />
                </Form.Item>
                <p className="">{t('Địa chỉ:')}</p>
                <Form.Item
                  className="mb-4"
                  name="DiaChi"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your Room!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                    placeholder="Tên phòng"
                  />
                </Form.Item>
                <p className="">{t('Tiêu đề:')}</p>
                <Form.Item
                  className="mb-4"
                  name="TieuDe"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your Room!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                    placeholder="Tên phòng"
                  />
                </Form.Item>
                <p className="">{t('Đánh giá:')}</p>
                <Form.Item
                  className="mb-4"
                  name="DanhGia"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your Room!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                    placeholder="Tên phòng"
                  />
                </Form.Item>

                <p className="">{t('Price')}</p>
                <Form.Item
                  className="mb-4"
                  name="MucGiaPhong"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your image!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                    placeholder={t('Price')}
                  />
                </Form.Item>
                <p className="">{t('Hinh anh')}</p>
                <Form.Item
                  className="mb-4"
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your image!'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    type="file"
                    className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                    placeholder={t('Link hinh anh')}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="hover:blacks rounded-[0.5rem] bg-slate-500 btn-login text-white py-[1rem] px-[0.5rem]"
              >
                {t('Add Room')}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default AddRoomPage;

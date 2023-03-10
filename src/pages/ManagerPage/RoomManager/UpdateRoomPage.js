import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
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
  Upload,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './AddRoomPage.scss';
import { locationService } from '../../../services/locationService';
import { roomService } from '../../../services/RoomService';
import { serviceRoomSv } from '../../../services/serviceRoomSv';
import { useParams } from 'react-router-dom';
function UpdateRoomPage({ setIsModalOpen, isModalOpen, handleOnSuccessUpdate, roomInfor, ID }) {
  const [form] = Form.useForm();
  const [roomApi, setRoomApi] = useState({});
  const [checkInfor, setCheckInfor] = useState([]);
  const { TextArea } = Input;
  const [listTypeRoom, setListTypeRoom] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const { hotelId } = useParams();
  const onFinish = (values) => {
    // const infor = {
    //   TenPhong: values.TenPhong,
    //   GiaPhong: values.GiaTien,
    //   MoTa: values.MoTa,
    //   SoLuongGiuong: values.SoLuongGiuong,
    //   SoLuongKhach: values.SoLuongKhach,
    //   SoLuongPhong: values.SoLuongPhong,
    //   TrangThai: false,
    //   MaKhachSan: hotelId,
    //   DichVu: values?.Checkbox,
    //   LoaiPhong: values.LoaiPhong,
    // };

    const formData = new FormData();
    formData.append('TenPhong', values.TenPhong);
    formData.append('MoTa', values.MoTa);
    formData.append('SoLuongGiuong', values.SoLuongGiuong);
    formData.append('SoLuongKhach', values.SoLuongKhach);
    formData.append('SoLuongPhong', values.SoLuongPhong);
    formData.append('TrangThai', false);
    formData.append('MaKhachSan', hotelId);

    roomService
      .putRoom(ID, formData)
      .then((res) => {
        message.success('cap nhat thanh cong');
        handleOnSuccessUpdate();
        setIsModalOpen(false);
        return res;
      })
      .catch((err) => {
        message.success('them thanh cong');
        console.log(err);
      });
  };
  useEffect(() => {
    roomService
      .getDetailRoom(ID)
      .then((res) => {
        setRoomApi(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    serviceRoomSv
      .getALlService()
      .then((res) => {
        setserviceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    roomService
      .getAllTypeRoom()
      .then((res) => {
        setListTypeRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleMapTypeRoom = () => {
    return listTypeRoom.map((item) => {
      return (
        <Select.Option className="text-black" value={item?.TenLoaiPhong}>
          {item?.TenLoaiPhong}
        </Select.Option>
      );
    });
  };
  const handleMapService = () => {
    return serviceList.map((item) => {
      return (
        <Checkbox
          className="checkbox-add-room"
          value={item?.TenDichVu}
          style={{
            lineHeight: '32px',
          }}
        >
          {item?.TenDichVu}
        </Checkbox>
      );
    });
  };

  useEffect(() => {
    roomApi &&
      form.setFieldsValue({
        TenPhong: roomApi.phong?.TenPhong,
        GiaPhong: roomApi.phong?.GiaTien,
        MoTa: roomApi.phong?.MoTa,
        SoLuongGiuong: roomApi.phong?.SoLuongGiuong,
        SoLuongKhach: roomApi.phong?.SoLuongKhach,
        SoLuongPhong: roomApi.phong?.SoLuongPhong,
        TrangThai: false,
        // MaKhachSan: params.hotelId,
        Checkbox: roomApi.phong?.TenDichVu,
        LoaiPhong: roomApi.phong?.LoaiPhong,
      });
  }, [form, roomApi, roomInfor]);
  console.log('roomApi', roomApi);
  const [imgSRC, setimgSRC] = useState([]);
  const onFinishFailed = (errorInfo) => {};

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg'
    ) {
      await setfile(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setimgSRC(e.target.result);
      };
    }
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
  return (
    <Modal
      title={t('C???p nh???t th??ng tin ph??ng')}
      open={isModalOpen}
      className="modal_add-room"
      onCancel={handleCancel}
    >
      <div className=" w-full flex justify-center items-center">
        <div className="w-full ">
          <Form
            form={form}
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
                <h2 className="font-[600] text-[1rem] text-[#1c305e] ">Th??ng tin chung</h2>
                <p className="">{t('T??n ph??ng')}</p>
                <Form.Item
                  className="mb-4"
                  name="TenPhong"
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
                    placeholder="T??n ph??ng"
                  />
                </Form.Item>

                <p className="">{t('M?? t???')}</p>
                <Form.Item
                  className="mb-4"
                  name="MoTa"
                  rules={[
                    {
                      required: true,
                      message: t('Please input your Country!'),
                    },
                  ]}
                >
                  <TextArea
                    className="border w-full py-[14] rounded-[0.5rem]"
                    placeholder="M?? t???"
                  />
                </Form.Item>
              </div>
              <div className="w-2/4 pl-6">
                <h2 className="font-[600] text-[1rem] text-[#1c305e] ">Th??ng tin b??? xung</h2>
                <p className="">{t('S??? l?????ng gi?????ng')}</p>
                <Form.Item
                  className="mb-4"
                  name="SoLuongGiuong"
                  rules={[
                    {
                      required: true,
                      message: t('H??y nh???p s??? l?????ng gi?????ng'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                    placeholder={t('S??? gi?????ng')}
                  />
                </Form.Item>
                <p className="">{t('S??? l?????ng ph??ng')}</p>
                <Form.Item
                  className="mb-4"
                  name="SoLuongPhong"
                  rules={[
                    {
                      required: true,
                      message: t('H??y nh???p s??? l?????ng ph??ng'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                    placeholder={t('S??? l?????ng ph??ng')}
                  />
                </Form.Item>
                <p className="">{t('S??? l?????ng kh??ch')}</p>
                <Form.Item
                  className="mb-4"
                  name="SoLuongKhach"
                  rules={[
                    {
                      required: true,
                      message: t('H??y nh???p s??? l?????ng kh??ch'),
                    },
                  ]}
                >
                  <Input
                    style={{ width: '100%' }}
                    className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                    placeholder={t('S??? l?????ng kh??ch')}
                  />
                </Form.Item>
                <p className="">{t('Lo???i ph??ng')}</p>
                <Form.Item name="LoaiPhong">
                  <Select size="large" defaultValue={roomApi.phong?.TenLoaiPhong}>
                    {handleMapTypeRoom()}
                  </Select>
                </Form.Item>
                <p className="">{t('D???ch v???')}</p>
                <Form.Item name="Checkbox">
                  <Checkbox.Group>
                    <div className=" flex flex-wrap">{handleMapService()}</div>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="hover:blacks rounded-[0.5rem] bg-slate-500 btn-login text-white py-[1rem] px-[0.5rem]"
              >
                {t('C???p nh???t')}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateRoomPage;

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
  message,
  notification,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './AddPromotionPage.scss';
import { userService } from '../../../services/userService';

import { updateInforUser } from '../../../redux/manager/user';
import { promotionService } from '../../../services/promotionService';

function UpdateUserPage({ setIsModalOpen, isModalOpen, ID, handleOnSuccessUpdate }) {
  const dispatch = useDispatch();

  const [promotionApi, setPromotionApi] = useState({});
  const [Avatar, setAvatar] = useState({});
  const [form] = Form.useForm();
  const openNotificationWithIcon = (type, mess, description) => {
    notification[type]({
      message: mess,
      description: description,
    });
  };
  useEffect(() => {
    promotionService
      .getPromotionById(ID)
      .then((res) => {
        setPromotionApi(res.data);
      })
      .catch((err) => {
        // message.error(err.response.data.content);
      });
  }, []);

  useEffect(() => {
    console.log('promotionApi.TenKhuyenMai', promotionApi.TenKhuyenMai);
    const NgayBatDau = moment(promotionApi.NgatBatDau).format('dd / mm / yyyy');
    const NgayKetThuc = moment(promotionApi.NgayKetThuc).format('dd / mm / yyyy');
    promotionApi &&
      form.setFieldsValue({
        TenKhuyenMai: promotionApi.TenKhuyenMai,
        ChiecKhau: promotionApi.ChiecKhau,
        NgayBatDau: moment(promotionApi.NgayBatDau),
        NgayKetThuc: moment(promotionApi.NgayKetThuc),
        MoTa: promotionApi.MoTa,
      });
  }, [form, promotionApi, ID]);
  console.log('promotionApi.TenKhuyenMai1', promotionApi.TenKhuyenMai);
  const onFinish = (values) => {
    const infor = {
      TenKhuyenMai: values.TenKhuyenMai,
      ChiecKhau: values.ChiecKhau,
      NgayBatDau: values.NgayKetThuc,
      NgayKetThuc: values.NgayBatDau,
      MoTa: values.MoTa,
    };
    promotionService
      .putPromotion(ID, infor)
      .then((res) => {
        openNotificationWithIcon('success', 'Hoàn tất', 'Bạn vừa cập nhật thông tin thành công!');
        handleOnSuccessUpdate();
      })
      .catch((err) => {
        openNotificationWithIcon('error', 'Thất bại');
      });

    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {};

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={t('Update Account')}
      open={isModalOpen}
      className="modal_add-user"
      onCancel={handleCancel}
    >
      <div className=" w-full flex justify-center items-center">
        <div className="w-full">
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
            <p className="">{t('Tên khuyến mãi:')}</p>
            <Form.Item
              className="mb-4"
              name="TenKhuyenMai"
              rules={[
                {
                  required: true,
                  message: t('Please input your username!'),
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                className="input border px-[14px] py-[14px] rounded-[0.5rem] 
                  "
                placeholder={t('tên khuyến mãi')}
              />
            </Form.Item>
            <p className="">{t('Ngày bắt đầu:')}</p>
            <Form.Item
              className="mb-4"
              name="NgayBatDau"
              wrapperCol={{ sm: 24 }}
              style={{ width: '100%', marginRight: '1rem' }}
            >
              <DatePicker className="datepicker-register w-full p-[8.3px]" format={'DD/MM/YYYY'} />
            </Form.Item>
            <p className="">{t('Ngày kết thúc:')}</p>
            <Form.Item
              className="mb-4"
              name="NgayKetThuc"
              wrapperCol={{ sm: 24 }}
              style={{ width: '100%', marginRight: '1rem' }}
            >
              <DatePicker className="datepicker-register w-full p-[8.3px]" format={'DD/MM/YYYY'} />
            </Form.Item>
            <p className="">{t('chiếc khấu')}</p>
            <Form.Item
              className="mb-4"
              name="ChiecKhau"
              rules={[
                {
                  required: true,
                  message: t('Please input your username!'),
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                placeholder={t('%')}
              />
            </Form.Item>
            <p className="">{t('Mô tả')}</p>
            <Form.Item
              className="mb-4"
              name="MoTa"
              rules={[
                {
                  required: true,
                  message: t('Please input your username!'),
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                placeholder={t('Mô tả')}
              />
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="hover:blacks rounded-[0.5rem] bg-slate-700 hover:bg-slate-500 btn-login text-white py-[0.7rem] font-[700] w-full px-[0.5rem]"
              >
                {t('Tạo khuyến mãi')}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateUserPage;

import React, { useEffect, useState } from 'react';

import { Button, Modal, Form, Input, Select, DatePicker, Col, Row, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './AddPromotionPage.scss';
import { promotionService } from '../../../services/promotionService';
import { localStorageService } from '../../../services/localStorageService';

function AddUserPage({ setIsModalOpen, isModalOpen, handleOnSuccess }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    // let birthday = moment(values.birthday).format('dd / mm / yyyy');

    const infor = {
      TenKhuyenMai: values.TenKhuyenMai,
      ChiecKhau: values.ChiecKhau,
      NgayBatDau: values.NgayBatDau,
      NgayKetThuc: values.NgayKetThuc,
      MoTa: values.MoTa,
    };
    console.log('localStorageService.get', localStorageService.get('accessToken'));
    promotionService
      .postPromotion(infor)
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
      title={t('Add Promotion')}
      open={isModalOpen}
      className="modal_add-user"
      onCancel={handleCancel}
    >
      <div className=" w-full flex justify-center items-center">
        <div className="w-full">
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
            <p className="">{t('T??n khuy???n m??i:')}</p>
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
                placeholder={t('t??n khuy???n m??i')}
              />
            </Form.Item>
            <p className="">{t('Ng??y b???t ?????u:')}</p>
            <Form.Item
              className="mb-4"
              name="NgayBatDau"
              wrapperCol={{ sm: 24 }}
              style={{ width: '100%', marginRight: '1rem' }}
            >
              <DatePicker className="datepicker-register w-full p-[8.3px]" format={'DD/MM/YYYY'} />
            </Form.Item>
            <p className="">{t('Ng??y k???t th??c:')}</p>
            <Form.Item
              className="mb-4"
              name="NgayKetThuc"
              wrapperCol={{ sm: 24 }}
              style={{ width: '100%', marginRight: '1rem' }}
            >
              <DatePicker className="datepicker-register w-full p-[8.3px]" format={'DD/MM/YYYY'} />
            </Form.Item>
            <p className="">{t('chi???c kh???u')}</p>
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
            <p className="">{t('M?? t???')}</p>
            <Form.Item
              className="mb-4"
              name="Mota"
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
                placeholder={t('M?? t???')}
              />
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="hover:blacks rounded-[0.5rem] bg-slate-700 hover:bg-slate-500 btn-login text-white py-[0.7rem] font-[700] w-full px-[0.5rem]"
              >
                {t('T???o khuy???n m??i')}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserPage;

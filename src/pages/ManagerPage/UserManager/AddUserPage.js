import React, { useEffect, useState } from 'react';

import { Button, Modal, Form, Input, Select, DatePicker, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import './AddUserPage.scss';
function AddUserPage({ setIsModalOpen, isModalOpen }) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    let birthday = moment(values.birthday).format('dd / mm / yyyy');

    const infor = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthday: birthday,
      gender: values.gender,
      role: 'USER',
    };

    dispatch(registerUser(infor));
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
      title={t('Add Account')}
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
            <p className="">{t('Email')}</p>
            <Form.Item
              className="mb-4"
              name="email"
              rules={[
                {
                  required: true,
                  message: t('Please input your Email!'),
                },
              ]}
            >
              <Input
                style={{ width: '100%' }}
                className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                placeholder="Email"
              />
            </Form.Item>
            <p className="">{t('Password')}</p>
            <Form.Item
              className="mb-4"
              name="password"
              rules={[
                {
                  required: true,
                  message: t('Please input your password!'),
                },
              ]}
            >
              <Input
                type="password"
                className="border password px-[14px] py-[14px] rounded-[0.5rem] "
                placeholder={t('Password')}
              />
            </Form.Item>
            <p className="">{t('Full name')}</p>
            <Form.Item
              className="mb-4"
              name="name"
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
                placeholder={t('Full name')}
              />
            </Form.Item>

            <Row span={24} style={{ width: '100%' }}>
              <Col span={12} style={{ paddingRight: '0.2rem' }}>
                <p className="">{t('Birthday')}</p>
                <Form.Item
                  className="mb-4"
                  name="birthday"
                  wrapperCol={{ sm: 24 }}
                  style={{ width: '100%', marginRight: '1rem' }}
                >
                  <DatePicker
                    className="datepicker-register w-full p-[8.3px]"
                    format={'DD/MM/YYYY'}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <p className="">{t('Gender')}</p>
                <Form.Item
                  className="mb-4"
                  wrapperCol={{ sm: 24 }}
                  style={{ width: '100%', borderRadius: 'none', marginRight: 0 }}
                  name="gender"
                >
                  <Select
                    size="large"
                    className="w-full dropdowregister "
                    placeholder={t('Gender')}
                  >
                    <Select.Option value="true">{t('male')}</Select.Option>
                    <Select.Option value="false">{t('female')}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <p className="">{t('Phone Number')}</p>
            <Form.Item
              className="mb-4"
              name="phone"
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
                placeholder={t('+84 Phone Number')}
              />
            </Form.Item>
            <p className="">{t('Role')}</p>
            <Form.Item
              className="mb-4"
              wrapperCol={{ sm: 24 }}
              style={{ width: '100%', borderRadius: 'none', marginRight: 0 }}
              name="role"
            >
              <Select size="large" className="w-full dropdowregister " placeholder={t('Role')}>
                <Select.Option value="User">{t('User')}</Select.Option>
                <Select.Option value="Admin">{t('Amin')}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="hover:blacks rounded-[0.5rem] bg-slate-700 hover:bg-slate-500 btn-login text-white py-[0.7rem] font-[700] w-full px-[0.5rem]"
              >
                {t('Register')}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserPage;

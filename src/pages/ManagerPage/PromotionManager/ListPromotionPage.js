import { useSelect, Search } from '@material-tailwind/react';
import React, { useEffect, koutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Tag, message } from 'antd';
import { getSearchPromotion, getUserList } from '../../../redux/manager/user';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './ListPromotionPage.scss';
import AddPromotionPage from './AddPromotion';
import ActionPromotion from './ActionPromotion';
import { setDate } from 'date-fns';

import { promotionService } from '../../../services/promotionService';
import moment from 'moment';
const ListPromotionPage = () => {
  const isDeleteSuccess = useSelector((state) => state.manager.user.isDeleteSuccess);
  const isUpdateSuccess = useSelector((state) => state.manager.user.isUpdateSuccess);

  const dispatch = useDispatch();
  const isRegisterAccountSuccess = useSelector((state) => state.auth.isRegisterAccountSuccess);
  const { t } = useTranslation();

  const [isUpdateUserSuccess, setIsUpdatePromotionSuccess] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: t('Tên khuyến mãi'),
      dataIndex: 'TenKhuyenMai',
      key: 'TenKhuyenMai',
    },
    {
      title: t('Chiếc khấu'),
      dataIndex: 'ChiecKhau',
      key: 'ChiecKhau',
    },
    {
      title: t('Ngày bắt đầu'),
      dataIndex: 'NgayBatDau',
      key: 'NgayBatDau',
      render: (_, record, index) => <div>{moment(record.NgayBatDau).format('dd / mm / yyyy')}</div>,
    },
    {
      title: t('Ngày kết thúc'),
      dataIndex: 'NgayKetThuc',
      key: 'NgayKetThuc',
      render: (_, record, index) => (
        <div>{moment(record.NgayKetThuc).format('dd / mm / yyyy')}</div>
      ),
    },
    {
      title: t('Mô tả'),
      dataIndex: 'MoTa',
      key: 'MoTa',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'acion',
    },
  ];
  const { Search } = Input;
  const [searchPromotion, setsearchPromotion] = useState(null);
  const onSearchPromotion = (value) => {
    setsearchPromotion(value);
  };
  const [dataPromotion, setDataPromotion] = useState([]);
  useEffect(() => {
    let fetchListPromotion = () => {
      promotionService
        .getAllPromotion()
        .then((res) => {
          let promotionList = res.data.map((promotion, index) => {
            return {
              key: index,
              ID: index,
              ...promotion,
              action: (
                <ActionPromotion
                  handleOnSuccess={fetchListPromotion}
                  key={index}
                  ID={promotion._id}
                  setIsUpdatePromotionSuccess={setIsUpdatePromotionSuccess}
                />
              ),
            };
          });
          console.log('promotionList', promotionList);
          setDataPromotion(promotionList);
        })
        .catch((err) => {});
    };
    fetchListPromotion();
  }, []);
  let fetchListPromotion = () => {
    promotionService
      .getAllPromotion()
      .then((res) => {
        let promotionList = res.data.map((promotion, index) => {
          return {
            key: index,
            ID: index,
            ...promotion,
            action: (
              <ActionPromotion
                key={index}
                ID={promotion._id}
                handleOnSuccess={fetchListPromotion}
              />
            ),
          };
        });

        setDataPromotion(promotionList);
        console.log(promotionList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (searchPromotion == '' || searchPromotion == null) {
      let fetchListPromotion = () => {
        promotionService
          .getAllPromotion()
          .then((res) => {
            let promotionList = res.data.map((promotion, index) => {
              return {
                key: index,
                ID: index,
                ...promotion,
                action: (
                  <ActionPromotion
                    key={index}
                    ID={promotion._id}
                    handleOnSuccess={fetchListPromotion}
                  />
                ),
              };
            });

            setDataPromotion(promotionList);
            console.log(promotionList);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchListPromotion();
    } else {
      let fetchListPromotion = () => {
        promotionService
          .getAllPromotion()
          .then((res) => {
            let promotionList = res.data.map((promotion, index) => {
              return {
                key: index,
                ID: index,
                ...promotion,
                action: (
                  <ActionPromotion
                    key={index}
                    ID={promotion._id}
                    handleOnSuccess={fetchListPromotion}
                  />
                ),
              };
            });

            setDataPromotion(promotionList);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchListPromotion();
    }
  }, [searchPromotion, isDeleteSuccess, isRegisterAccountSuccess, isUpdateSuccess]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full text-left p-2 bg-white rounded-[2rem] mb-3">
        <h1 className="text-[#1c305e] ml-4 text-[1rem] font-[700]">{t('Quản lý khuyến mãi')}</h1>
      </div>
      <div className="bg-white rounded-[1rem] p-4 h-[91.5%]">
        <div className="flex items-center mb-2">
          <Search
            placeholder={t('Tìm mã khuyến mãi')}
            onSearch={onSearchPromotion}
            enterButton
            className="search-manager"
          />
          <button
            onClick={handleShowModal}
            className="py-[0.4rem] px-[0.5rem] bg-[#8cc63f] transition-all hover:bg-[#b2da7f] text-white font-[600]  text-[0.8rem] rounded-[2rem]  ml-2"
          >
            {t('+ Thêm khuyến mãi')}
          </button>
        </div>
        <Table
          columns={columns}
          dataSource={dataPromotion}
          className="table-manger"
          pagination={{
            pageSize: 20,
          }}
          scroll={{
            y: 520,
          }}
        />
        <AddPromotionPage
          handleOnSuccess={() => {
            fetchListPromotion();
          }}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
};

export default ListPromotionPage;

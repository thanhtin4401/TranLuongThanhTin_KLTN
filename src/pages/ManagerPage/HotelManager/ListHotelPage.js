import React, { useEffect } from 'react';
import { Table, Tooltip } from 'antd';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { gethotelList } from '../../../redux/manager/room';
import RoomForm from './HotelForm';
import './ListHotelPage.scss';
import { hotelService } from '../../../services/HotelService';
import ActionHotel from './ActionHotel';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddHotelPage from './AddHotelPage';
import UploadImgHotel from './UploadImg';
function ListHotelManager() {
  const isDeleteSuccess = useSelector((state) => state.manager.room.isDeleteSuccess);
  const { t } = useTranslation();
  const isRegisterAccountSuccess = useSelector((state) => state.auth.isRegisterAccountSuccess);
  function convertString(str) {
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, ' ');
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
    str = str.trim();
    // bắt đầu xóa dấu tiếng việt  trong chuỗi
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str.toLowerCase();
  }
  const columns = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'ID',
      key: 'ID',
      fixed: 'left',
      width: 50,
    },
    {
      title: t('Picture'),
      dataIndex: 'hinhAnh',
      key: '3',
    },
    {
      title: 'Tên khách sạn',

      key: '7',

      render: (_, record, index) => (
        <div>
          <Tooltip placement="top" title={record?.TenKhachSan}>
            {record?.TenKhachSan.length < 30
              ? record?.TenKhachSan
              : record?.TenKhachSan.slice(0, 30) + '...'}
          </Tooltip>
        </div>
      ),
    },
    {
      title: t('Đánh giá'),
      dataIndex: 'DanhGia',
      key: '1',
      width: 100,
    },

    {
      title: t('Price'),
      dataIndex: 'MucGiaPhong',
      key: '6',
      width: 100,
    },

    {
      title: 'Mô tả',

      key: '7',

      render: (_, record, index) => (
        <div>
          <Tooltip placement="top" title={record?.MoTa}>
            {record?.MoTa.length < 30 ? record?.MoTa : record?.MoTa.slice(0, 30) + '...'}
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Địa chỉ',

      key: '7',

      render: (_, record, index) => (
        <div>
          <Tooltip placement="top" title={record?.DiaChi}>
            {record?.DiaChi.length < 30 ? record?.DiaChi : record?.DiaChi.slice(0, 30) + '...'}
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'acion',
      width: 200,
    },
  ];
  const { Search } = Input;
  const [searchHotel, setsearchHotel] = useState(null);
  const onSearchHotel = (value) => {
    setsearchHotel(value);
  };
  const [dataHotel, setDataHotel] = useState([]);
  let fetchListHotel = () => {
    hotelService
      .getAllHotel()
      .then((res) => {
        console.log("res",res);
        let hotelList = res.data.map((hotel, index) => {
          return {
            key: index,
            ID: index,
            ...hotel,
            hinhAnh: (
              <UploadImgHotel
                handleOnSuccess={fetchListHotel}
                imgRoom={hotel.HinhAnh}
                key={index}
                ID={hotel._id}
              />
            ),
            action: (
              <ActionHotel
                hotelInfor={hotel}
                key={index}
                ID={hotel._id}
                handleOnSuccess={fetchListHotel}
              />
            ),
          };
        });
        setDataHotel(hotelList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchListHotel();
  }, []);

  useEffect(() => {
    if (searchHotel == '' || searchHotel == null) {
      let fetchListHotel = () => {
        hotelService
          .getAllHotel()
          .then((res) => {
            let hotelList = res.data.content.map((hotel, index) => {
              return {
                key: index,
                ...hotel,
                hinhAnh: (
                  <UploadImgHotel
                    handleOnSuccess={fetchListHotel}
                    imgRoom={hotel.hinhAnh}
                    key={index}
                    ID={hotel._id}
                  />
                ),
                action: (
                  <ActionHotel
                    hotelInfor={hotel}
                    key={index}
                    ID={hotel._id}
                    handleOnSuccess={fetchListHotel}
                  />
                ),
              };
            });

            setDataHotel(hotelList);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchListHotel();
    } else {
      let fetchListHotel = () => {
        let roomRes = dataHotel.filter((loca) => {
          return convertString(loca.tenPhong) === convertString(searchHotel);
        });
        const hotelList = [
          {
            ...roomRes[0],
            action: (
              <ActionHotel
                hotelInfor={roomRes[0]}
                ID={roomRes[0]?.id}
                handleOnSuccess={fetchListHotel}
              />
            ),
          },
        ];
        setDataHotel(hotelList);
      };

      fetchListHotel();
    }
  }, [searchHotel, isDeleteSuccess, isRegisterAccountSuccess]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="w-full text-left p-2 bg-white rounded-[2rem] mb-3">
        <h1 className="text-[#1c305e] ml-4 text-[1rem] font-[700]">{t('Quản lý khách sạn')}</h1>
      </div>
      <div className="bg-white rounded-[1rem] p-4 h-[91.5%]">
        <div className="flex items-center mb-4">
          <Search
            placeholder={t('Find Room')}
            onSearch={onSearchHotel}
            enterButton
            className="search-manager"
          />
          <button
            onClick={handleShowModal}
            className="py-[0.4rem] px-[0.5rem] bg-[#8cc63f] transition-all hover:bg-[#b2da7f] text-white font-[600]  text-[0.8rem] rounded-[2rem]  ml-2"
          >
            {t('+ Add Hotel')}
          </button>
        </div>
        <Table
          columns={columns}
          dataSource={dataHotel}
          scroll={{
            y: 520,
          }}
        />
        <AddHotelPage
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleOnSuccess={() => {
            fetchListLocation();
          }}
        />
      </div>
    </>
  );
}

export default ListHotelManager;

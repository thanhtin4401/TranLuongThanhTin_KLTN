import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Filter.scss';
import { Button, Modal, Checkbox, Slider } from 'antd';
import { InputNumber, Space } from 'antd';
import { useTranslation } from 'react-i18next';
function Filter() {
  const { t } = useTranslation();
  const [filterForm, setFilterForm] = useState({
    minPrice: 0,
    maxPrice: 100,
    pool: false,
    driver: false,
    countBed: 'any',
  });

  // let screenWidth = window.screen.width;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    handleQueryFilter(filterForm);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChangeMinPrice = (value) => {
    setFilterForm({
      ...filterForm,
      minPrice: value,
    });
  };
  const onChangeMaxPrice = (value) => {
    setFilterForm({
      ...filterForm,
      maxPrice: value,
    });
  };
  const isPoolChecked = (e) => {
    setFilterForm({
      ...filterForm,
      pool: e.target.checked,
    });
  };
  const isDriverChecked = (e) => {
    setFilterForm({
      ...filterForm,
      driver: e.target.checked,
    });
  };
  const [rangePrice, setRangePrice] = useState([0, 0]);
  function onChange(value) {
    setRangePrice(value);
    setFilterForm({
      ...filterForm,
      minPrice: value[0],
      maxPrice: value[1],
    });
  }

  function onAfterChange(value) {}
  const handleBedCheck = (e) => {
    setFilterForm({
      ...filterForm,
      countBed: e.target.value,
    });
  };
  return (
    <div className="filter-room border rounded-[0.5rem] p-2 bg-[#f9af00]">
      <h1 className="text-[#0c3466] text-[2rem] font-[700]">Search</h1>
      <h1 className="font-[600] text-[1rem]">Price range</h1>
      <Slider
        range
        step={5}
        min={0}
        max={1000}
        defaultValue={[0, 20]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
      <div className="flex w-full justify-between items-center">
        <div className="p-2 w-2/4 border-[1px] rounded-lg bg-white">
          <p className="font-[300] text-[0.6rem]">{t('Min price')}</p>
          <div>
            <InputNumber
              disabled
              value={rangePrice[0]}
              className="price-input"
              defaultValue={1000}
              max="100000"
              min="0"
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onChang={onChangeMinPrice}
            />
          </div>
        </div>
        <p className="mx-4">~</p>
        <div className="p-2 w-2/4 border-[1px] rounded-lg bg-white">
          <p className="font-[300] text-[0.6rem]">{t('Max price')}</p>
          <div>
            <InputNumber
              disabled
              value={rangePrice[1]}
              className="price-input"
              defaultValue={5000}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onChange={onChangeMaxPrice}
            />
          </div>
        </div>
      </div>
      <div className="check pb-4 bo                                             r                   der-b-[1px]">
        <h1 className="font-[600] text-[1rem] mb-4">{t('Type of place')} </h1>
        <div className="grid grid-cols-2 gap-4">
          <label className="cursor-pointer flex items-center">
            {/* <input type="checkbox" value="pool" name="bed" /> */}
            <Checkbox className="radio-btn mr-2" onChange={isPoolChecked}>
              <div className="">
                <p className="text-[1rem] font-[400]">{t('Pool')}</p>
                <p className="text-[0.6rem] font-[300]">
                  {t('Your own room in a home or a hotel, plus some shared common spaces')}
                </p>
              </div>
            </Checkbox>
          </label>
          <label className="cursor-pointer flex items-center">
            <Checkbox className="radio-btn mr-2" onChange={isDriverChecked}>
              <div className="">
                <p className="text-[1rem] font-[400]">{t('Driver')}</p>
                <p className="text-[0.6rem] font-[300]">
                  {t('Your own room in a home or a hotel, plus some shared common spaces')}
                </p>
              </div>
            </Checkbox>
          </label>
        </div>
      </div>
      <div className="bed">
        <h1 className="font-[600] text-[1rem]">{t('Rooms and Beds')}</h1>
        <p className="font-[400] text-[0.8rem] my-4">{t('Bedrooms')}</p>
        <label className="cursor-pointer">
          <input
            onChange={handleBedCheck}
            value="any"
            className="radio-btn"
            type="radio"
            name="bed"
          />
          <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
            {t('Any')}
          </span>
        </label>
        <label className="cursor-pointer">
          <input
            onChange={handleBedCheck}
            value="2"
            className="radio-btn"
            type="radio"
            name="bed"
          />
          <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
            2
          </span>
        </label>
        <label className="cursor-pointer">
          <input
            onChange={handleBedCheck}
            value="4"
            className="radio-btn"
            type="radio"
            name="bed"
          />
          <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
            4
          </span>
        </label>
        <label className="cursor-pointer">
          <input
            onChange={handleBedCheck}
            value="6"
            className="radio-btn"
            type="radio"
            name="bed"
          />
          <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
            6
          </span>
        </label>
        <label className="cursor-pointer">
          <input
            onChange={handleBedCheck}
            value="8+"
            className="radio-btn"
            type="radio"
            name="bed"
          />
          <span className="tag-content mt-2 mb-0 border-black relative rounded-[4px]text-left border mr-[4px] p-2 inline-block">
            8+
          </span>
        </label>
      </div>
      <button type="" className="w-full p-2 rounded-[0.5rem] mt-4 bg-[#0c3466] text-white">
        Filter
      </button>
    </div>
  );
}

export default Filter;

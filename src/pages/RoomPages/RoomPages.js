import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { roomService } from '../../services/RoomService';
import Filter from './Filter';
import RoomItem from './RoomItem';

function RoomPages() {
  const [allRoom, setallRoom] = useState([]);
  const { hotelId } = useParams();

  useEffect(() => {
    roomService
      .getALlRoom(hotelId)
      .then((res) => {
        setallRoom(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleMapRoom = () => {
    return allRoom?.phong?.map((item) => {
      return <RoomItem roomInfor={item} />;
    });
  };
  return (
    <div className="container mx-auto pb-5  sm:pt-[0px] md:pt-[6rem] mb:pt-[6rem]">
      <div className="flex w-full">
        <div className="w-4/12 mb:hidden sm:block pr-4">
          <Filter />
        </div>
        <div className="mb:w-full sm:w-8/12">{handleMapRoom()}</div>
      </div>
    </div>
  );
}

export default RoomPages;

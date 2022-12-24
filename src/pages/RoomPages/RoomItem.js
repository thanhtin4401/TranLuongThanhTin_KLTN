import React from 'react';
import { Link } from 'react-router-dom';

function RoomItem({ roomInfor }) {
  return (
    <div className="w-full sm:flex mb:flex-col p-4 border rounded-[0.2rem] mb-2">
      <div className="mb:w-full sm:w-3/12 border">
        <img
         src={`http://localhost:8000/${roomInfor?.HinhAnh?.url}`}
          alt=""
          className="w-full object-cover h-full"
        />
      </div>
      <div className="mb:w-full sm:w-9/12 pl-2">
        <div className="w-full">
          <div className="sm:flex mb:flex-sol w-full">
            <div className="mb:w-full sm:w-8/12">
              <h1 className="mb-[0.1rem] text-[#0c3466] text-[1.3rem] font-[700]">
                {roomInfor.TenPhong}
              </h1>
              <h2 className="mb-[0.1rem] text-black text-[0.9rem]">500m from center</h2>
              <p className="mb-[0.1rem] text-white text-[0.9rem] inline-block p-[0.1rem] rounded-[0.2rem] bg-[#8dc63b]">
                Free airport taxi
              </p>
              <p className="mb-[0.1rem] font-[700] text-black">
                Stuio Apartmnet with Air conditioning
              </p>
              <p className="mb-[0.1rem] text-[#8dc63b] font-[700]">Free cancellation</p>
              <p className="mb-[0.1rem] text-[#8dc63b] text-[0.9rem]">
                You can cancel later, so lock in this great price today!
              </p>
            </div>
            <div className="mb-[0.1rem] mb:w-full sm:w-4/12 mb:text-left sm:text-right">
              <h1 className="mb-[0.1rem] text-[#0c1827] text-[1.2rem] font-[700] ">$200</h1>
              <h2 className="mb-[1rem] text-[0.9rem] ">Inclides taxes and fees</h2>
              <Link
                to={`/Detail-Room/${roomInfor._id}`}
                className="mb-[0.1rem] p-2 bg-[#0c3466] text-white rounded-[0.2rem] hover:opacity-70 transition-all mt-2"
              >
                {' '}
                See avallabillty
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;

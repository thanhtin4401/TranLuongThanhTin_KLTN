import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService';

function RequestPage() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const role = localStorageService.get('USER')?.QuyenHang;

  const navigate = useNavigate();
  useEffect(() => {
    if (auth && role == 'admin') {
      navigate('/Manager/Statistical');
    } else if (auth) {
      navigate('/');
    }
  }, [auth]);
  return <Outlet />;
}

export default RequestPage;

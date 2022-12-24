import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './RootLayout.scss';
// import Spinner from '../../component/UI/Spinner';
// import { logoutUser } from '../../store/auth/authSlice';
// import logo from "../../img/logo.png";
// import DropdownLanguages from '../UI/DropdownLanguages';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localStorageService } from '../services/localStorageService';
import { logoutUser } from '../redux/auth/authSlice';
export default function RootLayout() {
  const [isOpenSidebar, setisOpenSidebar] = useState(false);
  const [isOpenMenuProfile, setisOpenMenuProfile] = useState(false);
  const [isOpenSidebarMb, setisOpenSidebarMb] = useState(false);
  const isfetching = useSelector((state) => state.auth.isfetching);

  const dispatch = useDispatch();
  const handleSidebar = () => {
    setisOpenSidebar((current) => !current);
  };
  const handleSidebarMobile = () => {
    setisOpenSidebarMb((current) => !current);
  };
  const handleMenuProfile = () => {
    setisOpenMenuProfile((current) => !current);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorageService.remove('USER');
    localStorageService.remove('accessToken');
    navigate('/login');
  };
  const { t } = useTranslation();
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  return (
    <div className="relative">
      {/* {isfetching ? <Spinner /> : ''} */}
      <div className="background absolute"></div>
      <div
        className={
          isOpenSidebar
            ? 'sidebar mb:max-w-[55px] mb:bg-white flex flex-col justify-between active'
            : 'sidebar mb:max-w-[55px] mb:bg-white overflow-hidden flex flex-col justify-between'
        }
      >
        <div className="flex flex-col">
          <NavLink to="/" className="logo-detail">
            <img
              src="https://res.cloudinary.com/dvzingci9/image/upload/v1670852163/airBnB/logo/Logo-NovaLand-NVL-OriTe.png_cpm5ot.webp"
              alt=""
            />
          </NavLink>
          <nav className="nav">
            <ul className="nav-links">
              <li
                className={
                  splitLocation[2] === 'Statistical' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Statistical" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý thống kê')}</span>
                </Link>
              </li>
              <li
                className={
                  splitLocation[2] === 'Hotel' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Hotel" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý khách sạn')}</span>
                </Link>
              </li>
              <li
                className={
                  splitLocation[2] === 'Location' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Location" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý khu vực')}</span>
                </Link>
              </li>
              <li
                className={
                  splitLocation[2] === 'Promotion' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Promotion" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý khuyến mãi')}</span>
                </Link>
              </li>
              <li
                className={splitLocation[2] === 'user' ? 'active nav-links-item' : 'nav-links-item'}
              >
                <Link to="/Manager/user" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý tài khoản')}</span>
                </Link>
              </li>
              <li
                className={
                  splitLocation[2] === 'Employee' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Employee" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý nhân viên')}</span>
                </Link>
              </li>
              <li
                className={splitLocation[2] === 'bill' ? 'active nav-links-item' : 'nav-links-item'}
              >
                <Link to="/manager/bill" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý hoá đơn')}</span>
                </Link>
              </li>
              <li
                className={
                  splitLocation[2] === 'Service' ? 'active nav-links-item' : 'nav-links-item'
                }
              >
                <Link to="/Manager/Service" className="nav-links-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                    />
                  </svg>

                  <span className="link-name">{t('Quản lý dịch vụ')}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="home-section mb:left-[55px] ">
        <nav className="mb:left-[55px] 2xl:my-0 transition-colors white flex pr-[16px] items-center justify-between flex-wrap py-2 pl-0 my-0 ">
          <div className="flex justify-between ">
            <button
              className="flex items-center mb:hidden sm:hidden md:block text-14 rounded text-black hover:text-[gray] hover:border-white mr-4"
              onClick={handleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[35px] w-[60px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <button
              className="flex items-center mb:block sm:block md:hidden text-14 rounded text-black hover:text-[gray] hover:border-white mr-4"
              onClick={handleSidebarMobile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[35px] w-[60px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
          </div>
          <div className="flex header__action items-center">
            <button
              className={
                isOpenMenuProfile
                  ? 'header__action--profile mx-2 active'
                  : 'header__action--profile mx-2'
              }
              onClick={handleMenuProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-[2rem] w-[2rem] text-black hover:text-[gray]  transition duration-150 ease-out hover:ease-in"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <ul className="header__navbar-user-menu absolute bg-white z-10">
                <li className="header__navbar-user-name">Name user</li>
                <p className="btn__header__navbar-user-menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </p>
                <div className="bg__header__navbar-user-menu"></div>
                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <Link to="/Profile" className="ml-2 text-2md">
                    {t('Tài khoản')}
                  </Link>
                </li>

                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>

                  <Link to="/Profile" className="ml-2 text-2md">
                    {t('Liên hệ')}
                  </Link>
                </li>
                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <Link to="/Profile" className="ml-2 text-2md">
                    {t('Cài đặt')}
                  </Link>
                </li>
                <li className="header__navbar-user-item flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <p className="ml-2 text-2md mb-0" onClick={handleLogout}>
                    {t('Đăng xuất')}
                  </p>
                </li>
              </ul>
            </button>
            {/* <DropdownLanguages /> */}
          </div>
          <div
            className={
              isOpenSidebarMb
                ? 'sidebar-mobile active z-10 mb:flex sm:hidden flex-col justify-between'
                : 'sidebar-mobile z-10 mb:block sm:hidden flex justify-between'
            }
          >
            <div className="flex flex-col">
              <div className="logo-detail flex justify-between">
                <img
                  src="https://res.cloudinary.com/dvzingci9/image/upload/v1670852163/airBnB/logo/Logo-NovaLand-NVL-OriTe.png_cpm5ot.webp"
                  alt=""
                />
                <button
                  className="flex items-center text-14 rounded text-black hover:text-[gray] hover:border-white"
                  onClick={handleSidebarMobile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[35px] w-[60px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>
              </div>
              <ul className="nav-links">
                <li className="nav-links-item">
                  <Link to="/product-page" className="nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="link-name">{t('Home')}</span>
                  </Link>
                </li>
                <li className="nav-links-item">
                  <Link to="/detail-page" className="nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>

                    <span className="link-name">List Sale</span>
                  </Link>
                </li>
                <li className="nav-links-item">
                  <Link to="/detail-page" className=" nav-links-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>

                    <span className="link-name">{t('Tag Manager')}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <ul className="nav-lins-bottom nav-links"></ul>
            </div>
          </div>
          <div
            onClick={handleSidebarMobile}
            className={
              isOpenSidebarMb
                ? 'absolute h-screen w-screen left-0 top-0 bg-[#0000008c] mb:block sm:hidden'
                : 'hidden absolute h-screen w-screen left-0 top-0 bg-[#0000008c] mb:hidden sm:hidden'
            }
          ></div>
        </nav>
        <div className="px-[1rem] pt-[4rem] bg-[#e8ffca] h-screen">
          <Outlet />
        </div>
      </div>
      <div
        onClick={handleMenuProfile}
        className={isOpenMenuProfile ? 'absolute h-screen w-screen left-0 top-0' : ''}
      ></div>
    </div>
  );
}

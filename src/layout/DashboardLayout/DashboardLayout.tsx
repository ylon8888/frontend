/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ContextProvider } from '@/lib/MyContextProvider';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { Drawer, Layout, Space, theme } from 'antd';
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  MessageSquareText,
  NotebookPen,
  School,
  UserPen,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import {
  IoClose,
  IoMenu
} from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role || 'ADMIN';
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const context = useContext(ContextProvider);
  const windowWidth = context ? context.windowWidth : 0;
  const isSmallScreen = windowWidth < 1024;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (formData: any, reset: any) => {
    console.log(formData, reset);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="!font-poppins">
      {/* Mobile menu start */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setIsShowDrawer(false)}
        open={isShowDrawer}
        closeIcon={false}
        extra={
          <Space>
            <button
              onClick={() => setIsShowDrawer(false)}
              className="cursor-pointer"
            >
              <IoClose className="hover:text-red-500" size={25} />
            </button>
          </Space>
        }
      >
        <SideMenu role={role as string} />
      </Drawer>
      {/* Mobile menu end */}

      <Layout className="h-[calc(100vh-0px)]">
        <Layout>
          <div className="bg-white lg:border-t-[1px] lg:pt-5 overflow-hidden overflow-y-auto slim-scroll border">
            {!isSmallScreen && (
              <Sider
                trigger={null}
                collapsible
                className="!bg-white"
                width={280}
              >
                <div className="ms-2 xl:ms-3 2xl:ms-4 !font-poppins">
                  <SideMenu role={role as string} />
                </div>
              </Sider>
            )}
          </div>
          <div className="w-full">
            <Header className="!bg-gray-800 !text-white flex items-center justify-between !-mt-1 !px-5 lg:!px-12 !py-3 lg:!py-0 !h-fit border ">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-6 lg:!-mt-5">
                  {isSmallScreen && (
                    <button
                      onClick={() => setIsShowDrawer(true)}
                      className="cursor-pointer"
                    >
                      <IoMenu size={22} />
                    </button>
                  )}

                  <div className="hidden flex-col my-5 lg:flex">
                    <h4 className="text-[24px] font-semibold">
                      Welcome Back, Admin
                    </h4>
                    <p className="text-sm lg:-mt-2">
                      Please validate your action to proceed and unlock your
                      reward
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap-reverse items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* <button
                      className="relative hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Notifications"
                    >
                      <IoNotificationsOutline className="h-7 w-7 text-gray-600" />
                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                    </button> */}

                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded-full transition-colors"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                          <Image
                            height={100}
                            width={100}
                            src="https://res.cloudinary.com/du68mtlti/image/upload/v1746959604/user_lr70dy.png"
                            alt="User avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <MdKeyboardArrowDown className="h-5 w-5 text-gray-600" />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                          <div className="flex items-center gap-3 mx-3 border-b border-dashed cursor-pointer">
                            <div className="h-10 w-10 rounded-full border overflow-hidden bg-gray-100">
                              <Image
                                height={100}
                                width={100}
                                src="https://res.cloudinary.com/du68mtlti/image/upload/v1746959604/user_lr70dy.png"
                                alt="User avatar"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-black">Martin De</h3>
                          </div>
                          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <FiUser className="h-4 w-4 text-blue-primary" />
                            My Profile
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <BiLogOut className="h-4 w-4 text-blue-primary" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Header>

            <Content
              style={{
                // margin: '16px 16px',
                // padding: 24,
                //   background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="overflow-hidden overflow-y-auto h-[calc(100vh-100px)] px-5 lg:px-12 py-6"
            >
              {children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

const SideMenu = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const menuItems = useMemo(() => {
    if (role === 'ADMIN') {
      return [
        {
          href: '/dashboard',
          icon: <LayoutDashboard className="w-5 h-5 mr-1" />,
          text: 'Overview',
          isActive: true,
        },
        {
          href: '/dashboard/student-list',
          icon: <Users className="w-5 h-5 mr-1" />,
          text: 'Student',
          isActive: false,
        },
        {
          href: '/dashboard/classes',
          icon: <School className="w-5 h-5 mr-1" />,
          text: 'Classes',
          isActive: false,
        },
        {
          href: '/dashboard/blogs',
          icon: <NotebookPen className="w-5 h-5 mr-1" />,
          text: 'Blogs',
          isActive: false,
        },
        {
          href: '/dashboard/feedback',
          icon: <MessageSquareText className="w-5 h-5 mr-1" />,
          text: 'Feedback',
          isActive: false,
        },
      ];
    } else {
      return [
        {
          href: '/user',
          icon: <LayoutDashboard className="w-5 h-5 mr-1" />,
          text: 'Dashboard',
          isActive: true,
        },
        {
          href: '/user/enrolled-courses',
          icon: <School className="w-5 h-5 mr-1" />,
          text: 'Your Enroll Course',
          isActive: false,
        },
        {
          href: '/user/my-profile',
          icon: <UserPen className="w-5 h-5 mr-1" />,
          text: 'Your Profile',
          isActive: false,
        },
        {
          href: '/user/my-progress',
          icon: <ChartNoAxesCombined className="w-5 h-5 mr-1" />,
          text: 'Your Progress',
          isActive: false,
        },
      ];
    }
  }, [pathname, role]);

  useEffect(() => {
    const sortedMenuList = [...menuItems].sort(
      (a, b) => b.href.length - a.href.length
    );

    const selectedMenu = sortedMenuList.find((item) =>
      pathname?.startsWith(item.href)
    )?.href;

    if (selectedMenu) {
      setActiveKey(selectedMenu);
    }
  }, [pathname, menuItems]);

  const handleMenuClick = (e: { href: string }) => {
    setActiveKey(e.href);
  };

  return (
    <aside className="w-full bg-whit xl:border-r border-gray-200 flex flex-col justify-center ">
      <div>
        {/* logo */}
        <div className="border-b border-gray-200 pt-[9px] pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="57"
            viewBox="0 0 252 57"
            fill="none"
          >
            <mask
              id="mask0_265_4157"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="252"
              height="57"
            >
              <path d="M251.402 0H0.601562V57H251.402V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_265_4157)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.9765 39.8999C20.0868 39.8999 18.2747 39.1494 16.9385 37.8132C15.6022 36.4769 14.8515 34.6646 14.8515 32.7749V0H0.601562V32.7749C0.601562 44.5796 10.1719 54.1499 21.9765 54.1499H37.6515V39.8999H21.9765ZM64.7265 14.2499C63.0423 14.2499 61.3747 14.5817 59.8187 15.2262C58.2626 15.8707 56.8489 16.8155 55.658 18.0064C54.467 19.1973 53.5223 20.6111 52.8778 22.1671C52.2333 23.7231 51.9015 25.3907 51.9015 27.0749C51.9015 28.7591 52.2333 30.427 52.8778 31.9829C53.5223 33.5389 54.467 34.9528 55.658 36.1436C56.8489 37.3345 58.2626 38.2793 59.8187 38.9238C61.3747 39.5683 63.0423 39.8999 64.7265 39.8999C68.128 39.8999 71.39 38.5487 73.7952 36.1436C76.2004 33.7385 77.5515 30.4764 77.5515 27.0749C77.5515 23.6736 76.2004 20.4115 73.7952 18.0064C71.39 15.6013 68.128 14.2499 64.7265 14.2499ZM37.6515 27.0749C37.6515 12.1225 49.774 0 64.7265 0C79.6791 0 91.8015 12.1225 91.8015 27.0749C91.8015 42.0275 79.6791 54.1499 64.7265 54.1499C49.774 54.1499 37.6515 42.0275 37.6515 27.0749ZM218.627 14.2499C215.225 14.2499 211.963 15.6013 209.558 18.0064C207.152 20.4115 205.802 23.6736 205.802 27.0749C205.802 30.4764 207.152 33.7385 209.558 36.1436C211.963 38.5487 215.225 39.8999 218.627 39.8999C222.028 39.8999 225.29 38.5487 227.695 36.1436C230.101 33.7385 231.452 30.4764 231.452 27.0749C231.452 23.6736 230.101 20.4115 227.695 18.0064C225.29 15.6013 222.028 14.2499 218.627 14.2499ZM191.552 27.0749C191.552 12.1225 203.674 0 218.627 0C233.579 0 245.702 12.1225 245.702 27.0749C245.702 42.0275 233.579 54.1499 218.627 54.1499C203.674 54.1499 191.552 42.0275 191.552 27.0749ZM121.727 0C106.774 0 94.6515 12.1225 94.6515 27.0749C94.6515 42.0275 106.774 54.1499 121.727 54.1499H161.627C164.432 54.1499 167.138 53.7224 169.684 52.9301L177.302 56.9999L185.521 41.6042C187.609 37.6851 188.702 33.3126 188.702 28.8719V27.0749C188.702 12.1225 176.579 0 161.627 0H121.727ZM174.452 27.0749C174.452 23.6736 173.101 20.4115 170.695 18.0064C168.29 15.6013 165.028 14.2499 161.627 14.2499H121.727C120.042 14.2499 118.375 14.5817 116.819 15.2262C115.263 15.8707 113.849 16.8155 112.658 18.0064C111.467 19.1973 110.522 20.6111 109.878 22.1671C109.233 23.7231 108.902 25.3907 108.902 27.0749C108.902 28.7591 109.233 30.427 109.878 31.9829C110.522 33.5389 111.467 34.9528 112.658 36.1436C113.849 37.3345 115.263 38.2793 116.819 38.9238C118.375 39.5683 120.042 39.8999 121.727 39.8999H161.627C165.011 39.9001 168.258 38.5626 170.66 36.179C173.062 33.7954 174.426 30.5588 174.452 27.1747V27.0749Z"
                fill="#FF914D"
              />
              <path
                d="M251.398 3.56249C251.398 4.50733 251.024 5.41347 250.355 6.08157C249.687 6.74966 248.781 7.12499 247.836 7.12499C246.891 7.12499 245.985 6.74966 245.317 6.08157C244.648 5.41347 244.273 4.50733 244.273 3.56249C244.273 2.61766 244.648 1.71153 245.317 1.04344C245.985 0.375334 246.891 0 247.836 0C248.781 0 249.687 0.375334 250.355 1.04344C251.024 1.71153 251.398 2.61766 251.398 3.56249Z"
                fill="#FF0000"
              />
            </g>
          </svg>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center px-6 py-3 lg:max-w-52  rounded-lg gap-2 transition-colors duration-300 ${
                activeKey === item.href
                  ? '!bg-primary !text-white'
                  : '!text-gray-700 hover:!bg-primary hover:!text-white'
              }`}
            >
              {item.icon}
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardLayout;

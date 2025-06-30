/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ContextProvider } from "@/lib/MyContextProvider";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Drawer, Layout, Space, theme } from "antd";
import { TbLogout2 } from "react-icons/tb";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  MessageSquareText,
  NotebookPen,
  School,
  UserPen,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  use,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BiLogOut } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoClose, IoHomeSharp, IoMenu } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Swal from "sweetalert2";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loading from "@/components/ui/core/Loading/Loading";
import { ProgressProvider } from "@bprogress/next/app";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role || "STUDENT";

  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const context = useContext(ContextProvider);
  const windowWidth = context ? context.windowWidth : 0;
  const isSmallScreen = windowWidth < 1024;
  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (formData: any, reset: any) => {};

  const { data: response, isLoading, isFetching } = useGetMeQuery(undefined);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(logout());
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Logout failed. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }

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
        <SideMenu role={role} handleLogout={handleLogout} />
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
                  <SideMenu role={role} handleLogout={handleLogout} />
                </div>
              </Sider>
            )}
          </div>
          <div className="w-full">
            <ProgressProvider color="#0B7077">
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
                        Welcome Back, {response?.data?.firstName}{" "}
                        {response?.data?.lastName}
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
                              <h3 className="font-medium text-black">
                                {response?.data?.firstName}{" "}
                                {response?.data?.lastName}
                              </h3>
                            </div>
                            {/* <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <FiUser className="h-4 w-4 text-blue-primary" />
                            My Profile
                          </button> */}
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
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
            </ProgressProvider>

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

const SideMenu = ({
  role,
  handleLogout,
}: {
  role: string;
  handleLogout: () => void;
}) => {
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const menuItems = useMemo(() => {
    if (role === "ADMIN") {
      return [
        {
          href: "/dashboard",
          icon: <LayoutDashboard className="w-5 h-5 mr-1" />,
          text: "Overview",
          isActive: true,
        },
        {
          href: "/dashboard/student-list",
          icon: <Users className="w-5 h-5 mr-1" />,
          text: "Student List",
          isActive: false,
        },
        {
          href: "/dashboard/classes",
          icon: <School className="w-5 h-5 mr-1" />,
          text: "Classes",
          isActive: false,
        },
        {
          href: "/dashboard/blogs",
          icon: <NotebookPen className="w-5 h-5 mr-1" />,
          text: "Blogs",
          isActive: false,
        },
        {
          href: "/dashboard/feedback",
          icon: <MessageSquareText className="w-5 h-5 mr-1" />,
          text: "Feedback",
          isActive: false,
        },
      ];
    } else {
      return [
        {
          href: "/user",
          icon: <LayoutDashboard className="w-5 h-5 mr-1" />,
          text: "Your Progress",
          isActive: true,
        },
        {
          href: "/user/my-profile",
          icon: <UserPen className="w-5 h-5 mr-1" />,
          text: "Your Profile",
          isActive: false,
        },
        {
          href: "/user/enrolled-courses",
          icon: <School className="w-5 h-5 mr-1" />,
          text: "Enrolled Courses",
          isActive: false,
        },
        // {
        //   href: "/user/my-progress",
        //   icon: <ChartNoAxesCombined className="w-5 h-5 mr-1" />,
        //   text: "Your Progress",
        //   isActive: false,
        // },
        {
          href: "/dashboard/feedback",
          icon: <IoHomeSharp className="w-5 h-5 mr-1" />,
          text: "Go back to Home",
          isActive: false,
        },
      ];
    }
  }, [role]);

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
      <div className="flex flex-col h-[90vh]">
        {/* logo */}
        <div className="border-b border-gray-200 pt-[9px] pb-5">
          <Link
            href="/"
            style={{ fontSize: "32px", fontWeight: "700", color: "#0B7077" }}
          >
            Brain Drawer
          </Link>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center px-6 py-3 lg:max-w-52  rounded-lg gap-2 transition-colors duration-300 ${
                activeKey === item.href
                  ? "!bg-primary !text-white"
                  : "!text-gray-700 hover:!bg-primary hover:!text-white"
              }`}
            >
              {item.icon}
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="flex flex-grow items-end cursor-pointer">
          <button
            onClick={handleLogout}
            className="flex gap-5 bg-slate-100 px-8 py-2 lg:max-w-52 w-full rounded-md cursor-pointer"
          >
            <p>Logout</p>
            <TbLogout2 className="size-6" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardLayout;

const sidebar_menu = [
  {
    id: 1,
    // icon: DashboardIcon,
    path: "/",
    title: "Trang chủ",
  },
  {
    id: 2,
    // icon: DashboardIcon,
    path: "/hotelList" || "/hotelList/:code",
    title: "Quản lý khách sạn",
  },
  {
    id: 3,
    // icon: <i className="bx bx-bed"></i>,
    path: "/roomList",
    title: "Quản lý phòng",
  },
  {
    id: 4,
    // icon: <i className="bx bx-file"></i>,
    path: "/order",
    title: "Quản lý đơn đặt",
  },
];

export default sidebar_menu;

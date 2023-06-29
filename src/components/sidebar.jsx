// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./sidebar.scss";

// const sidebarNavItems = [
//   {
//     display: "Trang chủ",
//     icon: <i className="bx bx-home"></i>,
//     to: "/",
//     section: "",
//   },
//   {
//     display: "Quản lý khách sạn",
//     icon: <i className="bx bx-building"></i>,
//     to: "/",
//     section: "started",
//   },
//   {
//     display: "Quản lý phòng",
//     icon: <i className="bx bx-bed"></i>,
//     to: "/roomList",
//     section: "roomList",
//   },
//   {
//     display: "Quản lý đơn đặt",
//     icon: <i className="bx bx-file"></i>,
//     to: "/",
//     section: "user",
//   },
// ];

// const Sidebar = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [stepHeight, setStepHeight] = useState(0);
//   const sidebarRef = useRef();
//   const indicatorRef = useRef();
//   const location = useLocation();

//   useEffect(() => {
//     setTimeout(() => {
//       const sidebarItem = sidebarRef.current.querySelector(
//         ".sidebar__menu__item"
//       );
//       indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
//       setStepHeight(sidebarItem.clientHeight);
//     }, 50);
//   }, []);

//   // change active index
//   useEffect(() => {
//     const curPath = window.location.pathname.split("/")[1];
//     const activeItem = sidebarNavItems.findIndex(
//       (item) => item.section === curPath
//     );
//     setActiveIndex(curPath.length === 0 ? 0 : activeItem);
//   }, [location]);

//   return (
//     <div className="sidebar">
//       <div className="sidebar__logo">BOOKING</div>
//       <div ref={sidebarRef} className="sidebar__menu">
//         <div
//           ref={indicatorRef}
//           className="sidebar__menu__indicator"
//           style={{
//             transform: `translateX(-50%) translateY(${
//               activeIndex * stepHeight
//             }px)`,
//           }}
//         ></div>
//         {sidebarNavItems.map((item, index) => (
//           <Link to={item.to} key={index}>
//             <div
//               className={`sidebar__menu__item ${
//                 activeIndex === index ? "active" : ""
//               }`}
//             >
//               <div className="sidebar__menu__item__icon">{item.icon}</div>
//               <div className="sidebar__menu__item__text">{item.display}</div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

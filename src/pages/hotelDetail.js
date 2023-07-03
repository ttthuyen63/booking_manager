// import {
//   faAddressBook,
//   faBook,
//   faBookBookmark,
//   faBoxesPacking,
//   faBuilding,
//   faBuildingCircleArrowRight,
//   faBuildingCircleExclamation,
//   faBuildingFlag,
//   faBuildingUser,
//   faCaretDown,
//   faFileCirclePlus,
//   faHome,
//   faHouseChimneyUser,
//   faHouseCircleCheck,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Button, Table } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { customAxios } from "../config/api";
// import { logout } from "../redux/userSlice";
// import ConvertToString from "../components/ConvertToString";
// import { currencyFormat } from "../ultils/constant";
// import productData from "../components/product";
// import SideBar from "../components/Sidebar";
// import sidebar_menu from "../constants/sidebar-menu";
// import {
//   Col,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
//   ModalTitle,
// } from "reactstrap";
// import { Slide } from "react-slideshow-image";
// import { Buffer } from "buffer";

// export default function HotelDetail() {
//   const params = useParams();
//   const code = params.code;
//   const [isActiveProduct, setisActiveProduct] = useState(false);
//   const [isActiveOrder, setisActiveOrder] = useState(false);
//   const [showDetail, setShowDetail] = useState(false);
//   let productList = productData.getAllProducts();
//   const [detail, setdetail] = useState([]);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   //   const filterData = (props) => {
//   //     props?.forEach((currentValue, index, arr) => {
//   //       let code = currentValue.code;

//   //       let objIndex = arr.findIndex((item) => {
//   //         return item.code == code;
//   //       });
//   //       if (index == objIndex) {
//   //         currentValue.color = [currentValue.color];
//   //         currentValue.size = [currentValue.size];
//   //         currentValue.quantity = [currentValue.quantity];
//   //       } else {
//   //         if (!arr[objIndex].color.includes(currentValue.color)) {
//   //           arr[objIndex].color = [...arr[objIndex].color, currentValue.color];
//   //         }
//   //         if (!arr[objIndex].size.includes(currentValue.size)) {
//   //           arr[objIndex].size = [...arr[objIndex].size, currentValue.size];
//   //         }

//   //         if (!arr[objIndex].quantity.includes(currentValue.quantity)) {
//   //           arr[objIndex].quantity = [
//   //             ...arr[objIndex].quantity,
//   //             currentValue.quantity,
//   //           ];
//   //           // ?.reduce(function (a, b) {
//   //           //   return a + b;
//   //           // }, 0);

//   //           // arr[objIndex].quantity.reduce((partialSum, a) => partialSum + a, 0);
//   //         }
//   //         currentValue.code = null;
//   //       }
//   //     });
//   //     return props?.filter((e) => e.code !== null);
//   //   };

//   useEffect(() => {
//     getDetail();
//   }, []);
//   const getDetail = async () => {
//     try {
//       const dataDetail = await customAxios.get(`/hotel?id=${code}`);
//       setdetail(dataDetail?.data);
//     } catch (error) {}
//   };

//   console.log("data test detail...", detail);

//   const spanStyle = {
//     padding: "20px",
//     background: "#efefef",
//     color: "#000000",
//   };

//   const divStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundSize: "cover",
//     height: "400px",
//   };
//   function createTemporaryImageFile(base64Image) {
//     const decodedData = Buffer.from(base64Image, "base64");
//     const blob = new Blob([decodedData]);
//     const url = URL.createObjectURL(blob);
//     const cleanedUrl = url.replace(/^blob:/, "");
//     return cleanedUrl;
//   }
//   const base64Images = detail?.images; // Mảng các chuỗi base64 quá dài
//   const imageUrls = base64Images?.map(createTemporaryImageFile);

//   console.log("url", imageUrls);
//   return (
//     <div>
//       {/* {detail?.map((item, index) => ( */}
//       {/* <Modal
//         size="lg"
//         isOpen={showDetail}
//         toggle={() => setShowDetail(!showDetail)}
//       >
//         <ModalHeader toggle={() => setShowDetail(!showDetail)}></ModalHeader>
//         <ModalBody>
//           <form>
//             <Row>
//               <Col lg={6}>
//                 <div className="slide-container">
//                   <Slide>
//                     {detail?.images?.map((slideImage, index) => (
//                       <div key={index}>
//                         <div
//                           style={{
//                             ...divStyle,
//                             backgroundImage: `${slideImage}`,
//                           }}
//                         ></div>
//                       </div>
//                     ))}
//                   </Slide>
//                 </div>
//               </Col>
//               <Col lg={6}>
//                 <h2>{detail?.name}</h2>
//               </Col>
//             </Row>
//           </form>
//         </ModalBody>
//       </Modal> */}
//       <form>
//         <Row>
//           <Col lg={6}>
//             <div className="slide-container">
//               <Slide>
//                 {imageUrls?.map((imageUrl, index) => (
//                   <div key={index}>
//                     {/* <div
//                       style={{
//                         ...divStyle,
//                         backgroundImage: `url(${imageUrl})`,
//                       }}
//                     ></div> */}
//                     <img src={imageUrl}></img>
//                   </div>
//                 ))}
//                 {/* {imageUrls?.map((imageUrl, index) => (
//                   <div key={index}>
//                     <div
//                       style={{
//                         ...divStyle,
//                         backgroundImage: `${imageUrl}`,
//                       }}
//                     ></div>
//                   </div>
//                 ))} */}
//               </Slide>
//             </div>
//           </Col>
//           <Col lg={6}>
//             <h2>{detail?.name}</h2>
//           </Col>
//         </Row>
//       </form>
//       {/* ))} */}
//     </div>
//   );
// }

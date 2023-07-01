// import React from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAddressBook,
//   faArrowAltCircleUp,
//   faBook,
//   faBookBookmark,
//   faBoxesPacking,
//   faCaretDown,
//   faFileCirclePlus,
//   faHome,
//   faPencilSquare,
//   faPlusCircle,
//   faSave,
//   faStickyNote,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";
// import { customAxios } from "../config/api";
// import { addListhotel } from "../redux/hotelSlice";
// import { logout } from "../redux/userSlice";
// import moment from "moment";
// // import Select from "react-select/dist/declarations/src/Select";
// import Select from "react-select";

// export default function EditHotelPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const params = useParams();
//   const code = params.code;
//   const { ...stateLocation } = useLocation();
//   const itemDetail = stateLocation?.state;
//   console.log("itemDetail...", itemDetail);
//   const [detailhotel, setdetailhotel] = useState(null);
//   useEffect(() => {
//     getDetail();
//   }, []);
//   const getDetail = async () => {
//     try {
//       const dataDetail = await customAxios.get(`/home/code?param=${code}`);
//       setdetailhotel(dataDetail.data);
//     } catch (error) {}
//   };

//   console.log("testcodedata....", detailhotel);
//   const createDateDetail = new Date();
//   const createDateFormat = moment(createDateDetail).format("YYYY-MM-DD");
//   const [hotelState, sethotelState] = useState(null);
//   const [codehotelState, setcodehotelState] = useState("");
//   const [isActivehotel, setisActivehotel] = useState(false);
//   const [isActiveOrder, setisActiveOrder] = useState(false);
//   const [namehotel, setnamehotel] = useState(itemDetail?.name);
//   //   const [codehotel, setcodehotel] = useState(itemDetail?.code);
//   const [pricehotel, setpricehotel] = useState(itemDetail?.price);
//   const [quantity0, setquantity0] = useState(detailhotel[0]?.quantity);
//   const [quantity1, setquantity1] = useState(detailhotel[1]?.quantity);
//   const [quantity2, setquantity2] = useState(detailhotel[2]?.quantity);
//   const [quantity3, setquantity3] = useState(detailhotel[3]?.quantity);
//   const [colorhotel, setcolorhotel] = useState(itemDetail?.color);
//   const [sizehotel, setsizehotel] = useState(itemDetail?.size);
//   const [categoryhotel, setcategoryhotel] = useState(itemDetail?.categoryCode);
//   // const [generalCategoryhotel, setgeneralCategoryhotel] = useState(
//   //   itemDetail?.generalCategory
//   // );
//   const [description, setdescription] = useState(itemDetail?.description);
//   const [codeState, setcodeState] = useState(null);
//   const [generalCategoryData, setgeneralCategoryData] = useState(null);
//   const [categoryData, setcategoryData] = useState(null);
//   const [generalCategoryState, setgeneralCategoryState] = useState(null);
//   const [categoryState, setcategoryState] = useState(null);
//   const [imagehotelData1, setImagehotelData1] = useState(itemDetail?.image[0]);
//   const [imagehotelData2, setImagehotelData2] = useState(itemDetail?.image[1]);
//   // const [statushotel, setstatushotel] = useState(itemDetail?.statushotel);

//   const queryParams = new URLSearchParams(window.location.search);

//   // const handleClickCode = (code) => {
//   //   setcodehotelState(code);
//   // };

//   // useEffect(() => {
//   //   gethotelbyCode();
//   // }, []);
//   // const gethotelbyCode = async () => {
//   //   try {
//   //     const res = await customAxios.get(`/home/code?param=${codehotelState}`);
//   //     setcodehotelState(res?.data);
//   //   } catch (error) {
//   //     console.log("Lỗi");
//   //   }
//   // };

//   // const getDetail = async () => {
//   //   try {
//   //     const dataDetail = await customAxios.get(`/home/code?param=${code}`);
//   //     setdetailhotel(dataDetail.data);
//   //   } catch (error) {}
//   // };
//   // useEffect(() => {
//   //   getDetail();
//   // }, []);

//   // console.log("testcodedata....", detailhotel);

//   //   useEffect(() => {
//   //     getGeneralCategoryApi();
//   //   }, []);
//   //   const getGeneralCategoryApi = async () => {
//   //     try {
//   //       const res = await customAxios.get("/admin/item/category");
//   //       res.data.generalCategoryNames.forEach((currentValue, index, arr) => {
//   //         arr[index] = convertToObj(currentValue);
//   //       });
//   //       setgeneralCategoryState(res.data.generalCategoryNames);
//   //     } catch (error) {
//   //       console.log("Lỗi", error);
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     getcategoryApi();
//   //   }, []);
//   //   const getcategoryApi = async () => {
//   //     try {
//   //       const res = await customAxios.get("/admin/item/category");
//   //       res.data.categoryNames.forEach((currentValue, index, arr) => {
//   //         arr[index] = convertToObj(currentValue);
//   //       });
//   //       setcategoryState(res.data.categoryNames);
//   //     } catch (error) {
//   //       console.log("Lỗi", error);
//   //     }
//   //   };

//   const handleChangeGeneralCategory = (e) => {
//     setgeneralCategoryData(e);
//   };
//   const handleChangeCategory = (e) => {
//     setcategoryData(e);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
//     const newData = [
//       {
//         ...itemDetail,
//         name: namehotel,
//         id: idhotel,
//         price: pricehotel,
//         quantity: Number(quantity0),
//         // color: color0,
//         // size: size0,
//         categoryCode: categoryhotel,
//         image: [imagehotelData1, imagehotelData2],
//         description: description,
//       },
//       // {
//       //   ...itemDetail,

//       //   name: namehotel,
//       //   code: codehotel,
//       //   price: pricehotel,
//       //   quantity: [
//       //     // quantity0,
//       //     // quantity1,
//       //     // quantity2,
//       //     // quantity3,
//       //   ],
//       //   color: [colorhotel, colorhotel, colorhotel, colorhotel],
//       //   size: [sizehotel, colorhotel, colorhotel, colorhotel],
//       //   categoryCode: categoryhotel,
//       //   image: [imagehotelData1, imagehotelData2],

//       //   // generalCategory: generalCategoryhotel,
//       //   description: description,
//       // },
//       // {
//       //   ...itemDetail,
//       //   name: namehotel,
//       //   code: codehotel,
//       //   price: pricehotel,
//       //   quantity: [
//       //     // quantity0,
//       //     // quantity1,
//       //     // quantity2,
//       //     // quantity3,
//       //   ],
//       //   color: [colorhotel, colorhotel, colorhotel, colorhotel],
//       //   size: [sizehotel, colorhotel, colorhotel, colorhotel],
//       //   categoryCode: categoryhotel,
//       //   image: [imagehotelData1, imagehotelData2],

//       //   // generalCategory: generalCategoryhotel,
//       //   description: description,
//       // },
//       // {
//       //   ...itemDetail,
//       //   name: namehotel,
//       //   code: codehotel,
//       //   price: pricehotel,
//       //   quantity: [
//       //     // quantity0,
//       //     // quantity1,
//       //     // quantity2,
//       //     // quantity3,
//       //   ],
//       //   color: [colorhotel, colorhotel, colorhotel, colorhotel],
//       //   size: [sizehotel, colorhotel, colorhotel, colorhotel],
//       //   categoryCode: categoryhotel,
//       //   image: [imagehotelData1, imagehotelData2],

//       //   // generalCategory: generalCategoryhotel,
//       //   description: description,
//       // },
//     ];
//     const response = await customAxios.post(`/hotel`, newData);
//     navigate("/hotelList");
//     console.log("testdata", response.data);
//   };

//   const filterData = (detailhotel) => {
//     detailhotel?.forEach((currentValue, index, arr) => {
//       let code = currentValue.code;

//       let objIndex = arr.findIndex((item) => {
//         return item.code == code;
//       });
//       if (index == objIndex) {
//         currentValue.color = [currentValue.color];
//         currentValue.size = [currentValue.size];
//         currentValue.quantity = [currentValue.quantity];
//       } else {
//         if (!arr[objIndex].color.includes(currentValue.color)) {
//           arr[objIndex].color = [...arr[objIndex].color, currentValue.color];
//         }
//         if (!arr[objIndex].size.includes(currentValue.size)) {
//           arr[objIndex].size = [...arr[objIndex].size, currentValue.size];
//         }

//         if (!arr[objIndex].quantity.includes(currentValue.quantity)) {
//           arr[objIndex].quantity = [
//             ...arr[objIndex].quantity,
//             currentValue.quantity,
//           ];
//           // ?.reduce(function (a, b) {
//           //   return a + b;
//           // }, 0);

//           // arr[objIndex].quantity.reduce((partialSum, a) => partialSum + a, 0);
//         }
//         currentValue.code = null;
//       }
//     });
//     return detailhotel?.filter((e) => e.code !== null);
//   };

//   const codehotel = filterData(hotelState)?.map((item) => item.code);
//   // console.log("code..", codehotel);

//   const hotelByCode = filterData(detailhotel) ? filterData(detailhotel)[0] : "";

//   // console.log("testCode...", hotelByCode);

//   // console.log("probyCode...", filterData(detailhotel)[0]?.name);

//   const convertToObj = (item) => {
//     return {
//       value: item,
//       label: item,
//     };
//   };
//   const codeDetail = codehotel?.forEach((currentValue, index, arr) => {
//     arr[index] = convertToObj(currentValue);
//   });

//   const handleCancel = (e) => {
//     navigate("/hotelList");
//   };

//   const readId = params.readId;
//   return (
//     <div>
//       <div className="row">
//         <div className="col-sm-2" style={{ padding: 0 }}>
//           <div className="menu">
//             <h4 className="menu-header">Sport 9</h4>
//             <div className="d-flex align-items-start">
//               <div className="nav flex-column nav-pills">
//                 <Link
//                   className="nav-link"
//                   type="button"
//                   to="/"
//                   style={{ color: "white" }}
//                 >
//                   <FontAwesomeIcon icon={faHome} /> Home
//                 </Link>

//                 <div
//                   className="dropdown hotel nav-link"
//                   style={{ color: "white" }}
//                 >
//                   <div
//                     className="dropdown-btn"
//                     onClick={(e) => setisActivehotel(!isActivehotel)}
//                   >
//                     <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
//                     <FontAwesomeIcon
//                       icon={faCaretDown}
//                       style={{ paddingLeft: "10px" }}
//                     />
//                   </div>
//                   {!isActivehotel && (
//                     <div className="dropdown-content">
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link active"
//                           type="button"
//                           to="/hotelList"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           {/* <FontAwesomeIcon icon={faHome} /> */}
//                           Tất cả sản phẩm
//                         </Link>
//                       </div>
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link"
//                           type="button"
//                           to="/addhotel"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           {/* <FontAwesomeIcon icon={faHome} /> */}
//                           Thêm sản phẩm
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div
//                   className="dropdown order nav-link"
//                   style={{ color: "white" }}
//                 >
//                   <div
//                     className="dropdown-btn"
//                     onClick={(e) => setisActiveOrder(!isActiveOrder)}
//                   >
//                     <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
//                     <FontAwesomeIcon
//                       icon={faCaretDown}
//                       style={{ paddingLeft: "10px" }}
//                     />
//                   </div>
//                   {isActiveOrder && (
//                     <div className="dropdown-content">
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link"
//                           type="button"
//                           to="/orderList"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           Tất cả đơn hàng
//                         </Link>
//                       </div>
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link"
//                           type="button"
//                           to="/successDeliver"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           Đơn hàng thành công
//                         </Link>
//                       </div>
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link"
//                           type="button"
//                           to="/deliveringBill"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           Đơn hàng đang giao
//                         </Link>
//                       </div>
//                       <div className="dropdown-item">
//                         <Link
//                           className="nav-link"
//                           type="button"
//                           to="/confirmBill"
//                           style={{ color: "white", textDecoration: "none" }}
//                         >
//                           Đơn hàng chờ duyệt
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* <Link
//                 className="nav-link"
//                 type="button"
//                 to="/hotelList"
//                 style={{ color: "white" }}
//               >
//                 <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
//               </Link>
//               <Link
//                 className="nav-link"
//                 type="button"
//                 to="/bookList"
//                 style={{ color: "white" }}
//               >
//                 <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
//               </Link> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-sm-10" style={{ padding: 0 }}>
//           <div className="content">
//             <div className="content-header">
//               <h5 className="content-account">
//                 <Button
//                   onClick={() => {
//                     dispatch(logout());
//                     navigate("/");
//                   }}
//                 >
//                   Thoát
//                 </Button>
//               </h5>
//             </div>

//             <div className="control-addhotel container">
//               <div className="mt-3 control-hotel-table shadow-sm p-3 mb-5 bg-white rounded">
//                 <h4
//                   className="ml-0 mt-0"
//                   style={{ color: "black", textAlign: "center" }}
//                 >
//                   Chỉnh sửa sản phẩm
//                 </h4>
//                 <Form>
//                   <div className="row">
//                     <div className="form-horizontal col-sm-8">
//                       <div className="form-group">
//                         <label for="">Tiêu đề sản phẩm:</label>
//                         <input
//                           value={namehotel}
//                           type="text"
//                           className="form-control"
//                           onChange={(e) => setnamehotel(e.target.value)}
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label for="email">Phân loại sản phẩm:</label>
//                         {/* <Select
//                           // ref={categoryCodeRef}
//                           options={generalCategoryState}
//                           isClearable={true}
//                           className="form-control"
//                           value={generalCategoryhotel}
//                           placeholder="Chọn danh mục chung"
//                           onChange={(e) =>
//                             setgeneralCategoryhotel(e.target.value)
//                           }
//                         />
//                         <Select
//                           // ref={categoryCodeRef}
//                           options={categoryState}
//                           isClearable={true}
//                           className="form-control"
//                           value={categoryData}
//                           placeholder="Chọn phân loại theo danh mục"
//                           onChange={handleChangeCategory}
//                         /> */}
//                         <input
//                           value={categoryhotel}
//                           type="text"
//                           className="form-control"
//                           onChange={(e) => setcategoryhotel(e.target.value)}
//                         />
//                       </div>

//                       <div className="form-group">
//                         <div
//                           // style={{ paddingLeft: "30px" }}
//                           className="row mb-3"
//                         >
//                           <div style={{ display: "inline", width: "33%" }}>
//                             <label for="email">Màu sắc:</label>
//                             <input
//                               // ref={colorRef}
//                               // ref={(colorRef) =>
//                               //   (colorRef = `color${i}Ref`)
//                               // }
//                               type="text"
//                               name="color"
//                               className="form-control col-md-4"
//                               // onChange={(e) => handleInputChange()}
//                             />
//                           </div>
//                           <div style={{ display: "inline", width: "33%" }}>
//                             <label for="email">Kích cỡ:</label>
//                             <input
//                               // value={sizehotel}
//                               type="text"
//                               name="size"
//                               className="form-control col-md-4"
//                               // onChange={(e) => setsizehotel(e.target.value)}
//                             />
//                           </div>
//                           <div style={{ display: "inline", width: "33%" }}>
//                             {/* <div style={{ paddingLeft: "30px" }}> */}
//                             <label for="email">Số lượng:</label>
//                             <input
//                               // value={quantity0}
//                               type="number"
//                               name="quantity"
//                               className="form-control col-md-4"
//                               // onChange={(e) =>
//                               //   setquantity0(e.target.value)
//                               // }
//                             />
//                           </div>
//                           <div
//                             style={{
//                               display: "inline",
//                               width: "10%",
//                               paddingTop: "24px",
//                             }}
//                           ></div>
//                         </div>
//                         <div
//                           // style={{ paddingLeft: "30px" }}
//                           className="row mb-3"
//                         >
//                           <div style={{ display: "inline", width: "33%" }}>
//                             <label for="email">Màu sắc:</label>
//                             <input
//                               // ref={colorRef}
//                               // ref={(colorRef) =>
//                               //   (colorRef = `color${i}Ref`)
//                               // }
//                               type="text"
//                               name="color"
//                               className="form-control col-md-4"
//                               // onChange={(e) => handleInputChange()}
//                             />
//                           </div>
//                           <div style={{ display: "inline", width: "33%" }}>
//                             <label for="email">Kích cỡ:</label>
//                             <input
//                               value={sizehotel}
//                               type="text"
//                               name="size"
//                               className="form-control col-md-4"
//                               onChange={(e) => setsizehotel(e.target.value)}
//                             />
//                           </div>
//                           <div style={{ display: "inline", width: "33%" }}>
//                             {/* <div style={{ paddingLeft: "30px" }}> */}
//                             <label for="email">Số lượng:</label>
//                             <input
//                               // value={quantity1}
//                               type="number"
//                               name="quantity"
//                               className="form-control col-md-4"
//                               // onChange={(e) =>
//                               //   setquantity1(e.target.value)
//                               // }
//                             />
//                           </div>
//                           <div
//                             style={{
//                               display: "inline",
//                               width: "10%",
//                               paddingTop: "24px",
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                       {/* <div className="form-group">
//                         <label for="email">Địa chỉ:</label>
//                         <input
//                           // value={addresshotel}
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter address"
//                           // onChange={(e) => setaddresshotel(e.target.value)}
//                         />
//                       </div> */}
//                       <div className="form-group">
//                         <label className="control-label">Mô tả sản phẩm:</label>
//                         <textarea
//                           value={description}
//                           className="form-control"
//                           rows="4"
//                           cols="50"
//                           // placeholder="Nhập mô tả sản phẩm"
//                           onChange={(e) => setdescription(e.target.value)}
//                         ></textarea>
//                       </div>

//                       {/* <div className="form-group">
//                         <label for="">Trạng thái bạn đọc:</label>
//                         <select
//                           className="browser-default custom-select mb-2 mr-3"
//                           value={statushotel}
//                           onChange={(e) => setstatushotel(e.target.value)}
//                         >
//                           <option selected disabled>
//                             Status hotel
//                           </option>
//                           <option value="active">Active</option>
//                           <option value="inactive">Inactive</option>
//                         </select>
//                       </div> */}
//                     </div>

//                     <div class="form-horizontal col-sm-4">
//                       <label>Hình ảnh sản phẩm</label>
//                       <br />
//                       <input
//                         value={imagehotelData1}
//                         onChange={(e) => setImagehotelData1(e.target.value)}
//                         name="image"
//                         type="text"
//                       />
//                       <img
//                         variant="bottom"
//                         width={250}
//                         height={300}
//                         src={imagehotelData1}
//                       />
//                       <input
//                         value={imagehotelData2}
//                         onChange={(e) => setImagehotelData2(e.target.value)}
//                         name="image"
//                         type="text"
//                       />
//                       <img
//                         variant="bottom"
//                         width={250}
//                         height={300}
//                         src={imagehotelData2}
//                       />
//                     </div>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

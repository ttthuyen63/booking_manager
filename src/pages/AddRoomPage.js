import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faCaretDown,
  faCaretUp,
  faFileCirclePlus,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addListproduct, addproduct } from "../redux/productSlice";
import { customAxios, url } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

export default function AddRoomPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageproductData1, setImageproductData1] = useState();
  const [imageproductData2, setImageproductData2] = useState();
  const [genderData, setgenderData] = useState();
  const [activeproductData, setactiveproductData] = useState();
  const [status, setStatus] = useState("");
  const [generalCategoryData, setgeneralCategoryData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const [generalCategoryState, setgeneralCategoryState] = useState(null);
  const [categoryState, setcategoryState] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [inputList, setinputList] = useState([
    { color: "", size: "", quantity: "" },
  ]);
  const categoryCodeRef = useRef(null);
  const descriptionRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const size1Ref = useRef(null);
  const color1Ref = useRef(null);
  const quantity1Ref = useRef(null);
  const size0Ref = useRef(null);
  const color0Ref = useRef(null);
  const quantity0Ref = useRef(null);
  const size2Ref = useRef(null);
  const color2Ref = useRef(null);
  const quantity2Ref = useRef(null);
  const size3Ref = useRef(null);
  const color3Ref = useRef(null);
  const quantity3Ref = useRef(null);
  const image1productRef = useRef(null);
  const image2productRef = useRef(null);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/home/all");
      dispatch(addListproduct(res.data));
      // setproductState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const convertToObj = (item) => {
    return {
      value: item,
      label: item,
    };
  };

  useEffect(() => {
    getGeneralCategoryApi();
  }, []);
  const getGeneralCategoryApi = async () => {
    try {
      const res = await customAxios.get("/admin/item/category");
      // dispatch(addListproduct(res.data));
      res.data.generalCategoryNames.forEach((currentValue, index, arr) => {
        arr[index] = convertToObj(currentValue);
      });
      setgeneralCategoryState(res.data.generalCategoryNames);
      // const newDataGeneralCategory = res?.map((item) => ({
      //   item,
      // }));
      // setgeneralCategoryState(newDataGeneralCategory);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("geCate...", generalCategoryState);

  useEffect(() => {
    getcategoryApi();
  }, []);
  const getcategoryApi = async () => {
    try {
      const res = await customAxios.get("/admin/item/category");
      // dispatch(addListproduct(res.data));
      res.data.categoryNames.forEach((currentValue, index, arr) => {
        arr[index] = convertToObj(currentValue);
      });
      // const newDataCategory = res.data.categoryNames.map((item) => ({
      //   ...item,
      //   value: item?.value,
      //   // label: item,
      // }));
      // console.log("data...", newDataCategory);

      setcategoryState(res.data.categoryNames);
      // setcategoryState(res?.data.categoryNames);
      // const newDataCategory = res?.data?.categoryNames?.map((item) => ({
      // ...item,
      // }));
      // setcategoryState(res);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("cate...", categoryState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList([
      ...inputList,
      {
        color: value,
        size: value,
        quantity: value,
      },
    ]);
    console.log("e..", value);
  };
  const handleAddClick = (e) => {
    setinputList([
      ...inputList,
      { color: e.target.value, size: e.target.value, quantity: e.target.value },
    ]);
    // console.log("e..", e.target.value);
  };

  const handleChangeGeneralCategory = (e) => {
    setgeneralCategoryData(e);
  };
  const handleChangeCategory = (e) => {
    setcategoryData(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    // dispatch(
    //   addproduct({
    //     categoryCode: categoryCodeRef.current.value,
    //     description: descriptionRef.current.value,
    //     images: [imageproductData1, imageproductData2],
    //     itemDetails: [
    //       {
    //         size: size0Ref.current.value,
    //         color: color0Ref.current.value,
    //         quantity: Number(quantity0Ref.current.value),
    //       },
    //       {
    //         size: size1Ref.current.value,
    //         color: color1Ref.current.value,
    //         quantity: Number(quantity1Ref.current.value),
    //       },
    //       // {
    //       //   size: size0Ref?.current?.value,
    //       //   color: color0Ref?.current?.value,
    //       //   quantity: quantity0Ref?.current?.value,
    //       // },
    //       // {
    //       //   size: sizeRef.current.value,
    //       //   color: colorRef.current.value,
    //       //   quantity: quantityRef.current.value,
    //       // },
    //       // {
    //       //   size: sizeRef.current.value,
    //       //   color: colorRef.current.value,
    //       //   quantity: quantityRef.current.value,
    //       // },
    //     ],
    //     name: nameRef.current.value,
    //     price: Number(priceRef.current.value),
    //   })
    // )
    //   .unwrap()
    //   .then(
    //     () => navigate("/productList")
    //     // getproductApi();
    //   )

    //   .catch((e) => console.log("error..", e));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      categoryName: categoryData?.value,
      generalCategoryName: generalCategoryData?.value,
      description: descriptionRef.current.value,
      images: [image1productRef.current.value, image2productRef.current.value],
      itemDetails: [
        {
          size: size0Ref.current.value,
          color: color0Ref.current.value,
          quantity: Number(quantity0Ref.current.value),
        },
        {
          size: size1Ref.current.value,
          color: color1Ref.current.value,
          quantity: Number(quantity1Ref.current.value),
        },
        {
          size: size2Ref.current.value,
          color: color2Ref.current.value,
          quantity: Number(quantity2Ref.current.value),
        },
        {
          size: size3Ref.current.value,
          color: color3Ref.current.value,
          quantity: Number(quantity3Ref.current.value),
        },
        // {
        //   size: size0Ref?.current?.value,
        //   color: color0Ref?.current?.value,
        //   quantity: quantity0Ref?.current?.value,
        // },
        // {
        //   size: sizeRef.current.value,
        //   color: colorRef.current.value,
        //   quantity: quantityRef.current.value,
        // },
        // {
        //   size: sizeRef.current.value,
        //   color: colorRef.current.value,
        //   quantity: quantityRef.current.value,
        // },
      ],
      name: nameRef.current.value,
      price: Number(priceRef.current.value),

      // status: statusRef.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}/admin/item/add`, requestOptions)
      .then((response) => response.json())
      .then((result) => navigate("/productList"))
      .catch((error) => console.log("error", error));
  };

  const handleCancel = (e) => {
    navigate("/productList");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">KMA Booking</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link"
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Trang chủ
                </Link>

                <div
                  className="dropdown product nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveProduct(!isActiveProduct)}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý phòng
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {!isActiveProduct && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/productList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Tất cả phòng
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link active"
                          type="button"
                          to="/addProduct"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Thêm phòng
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="dropdown order nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveOrder(!isActiveOrder)}
                  >
                    <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn đặt
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {isActiveOrder && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/orderList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Tất cả đơn đặt
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/successDeliver"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn đặt thành công
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/deliveringBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng chờ duyệt
                        </Link>
                      </div>
                      {/* <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/confirmBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng chờ duyệt
                        </Link>
                      </div> */}
                    </div>
                  )}
                </div>

                {/* <Link
                className="nav-link"
                type="button"
                to="/productList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
              </Link>
              <Link
                className="nav-link"
                type="button"
                to="/bookList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
              </Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <div>
                {/* <h5
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Thêm sản phẩm
                </h5> */}
                <h5 className="content-account">
                  <Button
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    Thoát
                  </Button>
                </h5>
              </div>
            </div>

            <div
              className="control-addproduct container"
              // style={{ marginLeft: "20px" }}
              style={{ paddingLeft: "0px" }}
            >
              <div className="mt-3 control-product-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Thêm phòng
                </h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-9">
                      <div className="form-group">
                        <label className="control-label">Tên phòng:</label>
                        <input
                          ref={nameRef}
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên phòng"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label">Mã phòng:</label>
                        <input
                          ref={nameRef}
                          type="text"
                          className="form-control"
                          placeholder="Nhập mã phòng"
                        />
                      </div>
                      {/* <div className="form-group">
                        <label for="">Giá:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          ref={nameRef}
                          onChange={(e) => setgenderData(e.target.value)}
                        >
                          <option selected disabled>
                            Chọn giới tính
                          </option>
                          <option value="MALE">Nam</option>
                          <option value="FEMALE">Nữ</option>
                        </select>
                      </div> */}

                      <div className="form-group">
                        <label for="">Giá phòng:</label>
                        <input
                          ref={priceRef}
                          type="number"
                          className="form-control"
                          placeholder="Nhập giá phòng"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Phân loại phòng: </label>
                        {/* <Select
                          
                          options={generalCategoryState}
                          isClearable={true}
                          className="form-control"
                          value={generalCategoryData}
                          placeholder="Chọn danh mục chung"
                          onChange={handleChangeGeneralCategory}
                        /> */}
                        <select
                          className="browser-default custom-select w-30 mb-2 mr-3"
                          // value={filterStatus}
                          // onChange={handleChange}
                        >
                          {/* <option selected disabled>
                            
                          </option> */}
                          {/* {filterData(productState)?.map((item) => (
                      <option value={item?.categoryCode}>
                        {item?.categoryCode}
                      </option>
                    ))}
                       */}
                          <option value="trang-phuc_bong-da">Phòng đơn</option>
                          <option value="trang-phuc_bong-chuyen">
                            Phòng đôi
                          </option>
                        </select>
                      </div>

                      {/* <div className="form-group">
                        <label for="email">Mã sản phẩm:</label>
                        <input
                          // ref={categorySlugRef}
                          type="text"
                          className="form-control"
                          // placeholder="Enter address email"
                        />
                      </div> */}

                      {/* <div className="form-group">
                        <div>
                          {inputList.map((x, i) => {
                            console.log("x...", x);
                            const colorRef = eval(`color${i}Ref`);
                            const sizeRef = eval(`size${i}Ref`);
                            const quantityRef = eval(`quantity${i}Ref`);

                            console.log("co..", typeof colorRef);
                            return (
                              <div
                                className="row mb-3"
                              >
                                <div
                                  style={{ display: "inline", width: "30%" }}
                                >
                                  <label for="email">Màu sắc:</label>
                                  <input
                                    ref={colorRef}
                                    
                                    type="text"
                                    name="color"
                                    className="form-control col-md-4"
                                  />
                                </div>
                                <div
                                  style={{ display: "inline", width: "30%" }}
                                >
                                  <label for="email">Kích cỡ:</label>
                                  <input
                                    ref={sizeRef}
                                    type="text"
                                    name="size"
                                    className="form-control col-md-4"
                                  />
                                </div>
                                <div
                                  style={{ display: "inline", width: "27%" }}
                                >
                                  <label for="email">Số lượng:</label>
                                  <input
                                    ref={quantityRef}
                                    type="number"
                                    name="quantity"
                                    className="form-control col-md-4"
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "inline",
                                    width: "10%",
                                    paddingTop: "24px",
                                  }}
                                >
                                  <Button
                                    className="btn btn-secondary"
                                    onClick={handleAddClick}
                                  >
                                    Thêm
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div> */}

                      <div className="form-group">
                        <label for="">Giá phòng:</label>
                        <input
                          ref={priceRef}
                          type="number"
                          className="form-control"
                          placeholder="Nhập giá phòng"
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label">Mô tả phòng:</label>
                        <textarea
                          ref={descriptionRef}
                          className="form-control"
                          rows="4"
                          cols="50"
                          placeholder="Nhập mô tả phòng"
                        ></textarea>
                      </div>
                      {/* <div className="form-group">
                        <label className="control-label" for="pwd">
                          Mã bạn đọc:
                        </label>
                        <input
                          ref={descriptionRef}
                          type="text"
                          className="form-control"
                          placeholder="Enter code product"
                        />
                      </div>

                      <div className="form-group">
                        <label className="control-label" for="date">
                          Ngày hết hạn:
                        </label>
                        <input
                          ref={quantityRef}
                          type="date"
                          className="form-control"
                          placeholder="dd-mm-yy"
                        />
                      </div> */}
                    </div>
                    <div class="form-horizontal col-sm-3">
                      <label>Hình ảnh sản phẩm</label>
                      <br />
                      {/* <Button className="formInput">
                        <label htmlFor="file">
                          <DriveFolderUploadOutlinedIcon className="icon" /> Tải
                          ảnh lên
                        </label>
                        <input
                          // value={imageproductData1}
                          // ref={image1productRef}
                          // onChange={(e) => setImageproductData1(e.target.value)}
                          // name="image"
                          // type="text"
                          type="file"
                          id="file"
                          onChange={(e) =>
                            setImageproductData1(e.target.files[0])
                          }
                          style={{ display: "none" }}
                        />
                      </Button>
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        // src={imageproductData1}
                        src={
                          imageproductData1
                            ? URL.createObjectURL(imageproductData1)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                      /> */}
                      {/* <Button className="formInput">
                        <label htmlFor="file">
                          <DriveFolderUploadOutlinedIcon className="icon" /> Tải
                          ảnh lên
                        </label> */}
                      <input
                        value={imageproductData1}
                        ref={image1productRef}
                        onChange={(e) => setImageproductData1(e.target.value)}
                        name="image"
                        type="text"
                        // type="file"
                        // id="file"
                        // onChange={(e) =>
                        //   setImageproductData2(e.target.files[1])
                        // }
                        // style={{ display: "none" }}
                      />
                      {/* </Button> */}
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        src={imageproductData1}
                        // src={
                        //   imageproductData2
                        //     ? URL.createObjectURL(imageproductData2)
                        //     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        // }
                      />
                      <input
                        value={imageproductData2}
                        ref={image2productRef}
                        onChange={(e) => setImageproductData2(e.target.value)}
                        name="image"
                        type="text"
                      />
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        src={imageproductData2}
                      />
                    </div>

                    {/* <div
                      className="form-horizontal col-sm-4"
                      style={{ marginLeft: "10px", marginTop: "40px" }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1512/1512910.png"
                        style={{ width: "250px", height: "350px" }}
                      />
                    </div> */}
                  </div>
                </Form>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <Button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      <FontAwesomeIcon icon={faSave} /> Lưu
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCancel}
                    >
                      &times; Hủy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

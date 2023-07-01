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
import { addListhotel, addhotel } from "../redux/hotelSlice";
import { customAxios, url } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";

export default function AddHotelPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagehotelData1, setImagehotelData1] = useState();
  const [imagehotelData2, setImagehotelData2] = useState();
  const [genderData, setgenderData] = useState();
  const [activehotelData, setactivehotelData] = useState();
  const [status, setStatus] = useState("");
  const [generalCategoryData, setgeneralCategoryData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const [generalCategoryState, setgeneralCategoryState] = useState(null);
  const [categoryState, setcategoryState] = useState(null);
  const [isActivehotel, setisActivehotel] = useState(false);
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
  const image1hotelRef = useRef(null);
  const image2hotelRef = useRef(null);
  const gethotelApi = async () => {
    try {
      const res = await customAxios.get("/home/all");
      dispatch(addListhotel(res.data));
      // sethotelState(res?.data);
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
      // dispatch(addListhotel(res.data));
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
      // dispatch(addListhotel(res.data));
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
    //   addhotel({
    //     categoryCode: categoryCodeRef.current.value,
    //     description: descriptionRef.current.value,
    //     images: [imagehotelData1, imagehotelData2],
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
    //     () => navigate("/hotelList")
    //     // gethotelApi();
    //   )

    //   .catch((e) => console.log("error..", e));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      categoryName: categoryData?.value,
      generalCategoryName: generalCategoryData?.value,
      description: descriptionRef.current.value,
      images: [image1hotelRef.current.value, image2hotelRef.current.value],
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
      .then((result) => navigate("/hotelList"))
      .catch((error) => console.log("error", error));
  };

  const handleCancel = (e) => {
    navigate("/hotelList");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-3" style={{ padding: 0 }}>
          <SideBar menu={sidebar_menu} />
        </div>

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <div>
              
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
              className="control-addhotel container"
              // style={{ marginLeft: "20px" }}
              style={{ paddingLeft: "0px" }}
            >
              <div className="mt-3 control-hotel-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Thêm sản phẩm
                </h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-9">
                      <div className="form-group">
                        <label className="control-label">Tiêu đề:</label>
                        <input
                          ref={nameRef}
                          type="text"
                          className="form-control"
                          placeholder="Nhập tiêu đề sản phẩm"
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
                        <label for="">Giá:</label>
                        <input
                          ref={priceRef}
                          type="number"
                          className="form-control"
                          placeholder="Nhập giá sản phẩm"
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Phân loại sản phẩm:</label>
                        <Select
                          // ref={categoryCodeRef}
                          options={generalCategoryState}
                          isClearable={true}
                          className="form-control"
                          value={generalCategoryData}
                          placeholder="Chọn danh mục chung"
                          onChange={handleChangeGeneralCategory}
                        />
                        <Select
                          // ref={categoryCodeRef}
                          options={categoryState}
                          isClearable={true}
                          className="form-control"
                          value={categoryData}
                          placeholder="Chọn phân loại theo danh mục"
                          onChange={handleChangeCategory}
                        />
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

                      <div className="form-group">
                        <div>
                          {inputList.map((x, i) => {
                            console.log("x...", x);
                            const colorRef = eval(`color${i}Ref`);
                            const sizeRef = eval(`size${i}Ref`);
                            const quantityRef = eval(`quantity${i}Ref`);

                            console.log("co..", typeof colorRef);
                            return (
                              <div
                                // style={{ paddingLeft: "30px" }}
                                className="row mb-3"
                              >
                                <div
                                  style={{ display: "inline", width: "30%" }}
                                >
                                  <label for="email">Màu sắc:</label>
                                  <input
                                    ref={colorRef}
                                    // ref={(colorRef) =>
                                    //   (colorRef = `color${i}Ref`)
                                    // }
                                    type="text"
                                    name="color"
                                    className="form-control col-md-4"
                                    // onChange={(e) => handleInputChange()}
                                  />
                                </div>
                                <div
                                  style={{ display: "inline", width: "30%" }}
                                >
                                  <label for="email">Kích cỡ:</label>
                                  <input
                                    ref={sizeRef}
                                    // ref={`size${i}Ref`}
                                    // ref={(sizeRef) => (sizeRef = `size${i}Ref`)}
                                    type="text"
                                    name="size"
                                    className="form-control col-md-4"
                                    // onChange={(e) => handleInputChange()}
                                  />
                                </div>
                                <div
                                  style={{ display: "inline", width: "27%" }}
                                >
                                  {/* <div style={{ paddingLeft: "30px" }}> */}
                                  <label for="email">Số lượng:</label>
                                  <input
                                    ref={quantityRef}
                                    // ref={(quantityRef) =>
                                    //   (quantityRef = `quantity${i}Ref`)
                                    // }
                                    type="number"
                                    name="quantity"
                                    className="form-control col-md-4"
                                    // onChange={(e) => handleInputChange()}
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
                      </div>
                      <div className="form-group">
                        <label className="control-label">Mô tả sản phẩm:</label>
                        <textarea
                          ref={descriptionRef}
                          className="form-control"
                          rows="4"
                          cols="50"
                          placeholder="Nhập mô tả sản phẩm"
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
                          placeholder="Enter code hotel"
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
                          // value={imagehotelData1}
                          // ref={image1hotelRef}
                          // onChange={(e) => setImagehotelData1(e.target.value)}
                          // name="image"
                          // type="text"
                          type="file"
                          id="file"
                          onChange={(e) =>
                            setImagehotelData1(e.target.files[0])
                          }
                          style={{ display: "none" }}
                        />
                      </Button>
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        // src={imagehotelData1}
                        src={
                          imagehotelData1
                            ? URL.createObjectURL(imagehotelData1)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                      /> */}
                      {/* <Button className="formInput">
                        <label htmlFor="file">
                          <DriveFolderUploadOutlinedIcon className="icon" /> Tải
                          ảnh lên
                        </label> */}
                      <input
                        value={imagehotelData1}
                        ref={image1hotelRef}
                        onChange={(e) => setImagehotelData1(e.target.value)}
                        name="image"
                        type="text"
                        // type="file"
                        // id="file"
                        // onChange={(e) =>
                        //   setImagehotelData2(e.target.files[1])
                        // }
                        // style={{ display: "none" }}
                      />
                      {/* </Button> */}
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        src={imagehotelData1}
                        // src={
                        //   imagehotelData2
                        //     ? URL.createObjectURL(imagehotelData2)
                        //     : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        // }
                      />
                      <input
                        value={imagehotelData2}
                        ref={image2hotelRef}
                        onChange={(e) => setImagehotelData2(e.target.value)}
                        name="image"
                        type="text"
                      />
                      <img
                        variant="bottom"
                        width={200}
                        height={300}
                        src={imagehotelData2}
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

import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faCaretDown,
  faFileCirclePlus,
  faHome,
  faPencilSquare,
  faPlusCircle,
  faSave,
  faStickyNote,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { customAxios } from "../config/api";
import { addListproduct } from "../redux/productSlice";
import { logout } from "../redux/userSlice";
import moment from "moment";
// import Select from "react-select/dist/declarations/src/Select";
import Select from "react-select";

export default function EditRoomPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const code = params.code;
  const { ...stateLocation } = useLocation();
  const itemDetail = stateLocation?.state;
  console.log("itemDetail...", itemDetail);
  const [detailProduct, setdetailProduct] = useState(null);
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/home/code?param=${code}`);
      setdetailProduct(dataDetail.data);
    } catch (error) {}
  };

  console.log("testcodedata....", detailProduct);
  const createDateDetail = new Date();
  const createDateFormat = moment(createDateDetail).format("YYYY-MM-DD");
  const [productState, setproductState] = useState(null);
  const [codeproductState, setcodeproductState] = useState("");
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [nameproduct, setnameproduct] = useState(itemDetail?.name);
  const [codeproduct, setcodeproduct] = useState(itemDetail?.code);
  const [priceproduct, setpriceproduct] = useState(itemDetail?.price);
  const [quantity0, setquantity0] = useState(detailProduct[0]?.quantity);
  const [quantity1, setquantity1] = useState(detailProduct[1]?.quantity);
  const [quantity2, setquantity2] = useState(detailProduct[2]?.quantity);
  const [quantity3, setquantity3] = useState(detailProduct[3]?.quantity);
  const [colorproduct, setcolorproduct] = useState(itemDetail?.color);
  const [sizeproduct, setsizeproduct] = useState(itemDetail?.size);
  const [categoryproduct, setcategoryproduct] = useState(
    itemDetail?.categoryCode
  );
  // const [generalCategoryproduct, setgeneralCategoryproduct] = useState(
  //   itemDetail?.generalCategory
  // );
  const [description, setdescription] = useState(itemDetail?.description);
  const [codeState, setcodeState] = useState(null);
  const [generalCategoryData, setgeneralCategoryData] = useState(null);
  const [categoryData, setcategoryData] = useState(null);
  const [generalCategoryState, setgeneralCategoryState] = useState(null);
  const [categoryState, setcategoryState] = useState(null);
  const [imageproductData1, setImageproductData1] = useState(
    itemDetail?.image[0]
  );
  const [imageproductData2, setImageproductData2] = useState(
    itemDetail?.image[1]
  );
  // const [statusproduct, setstatusproduct] = useState(itemDetail?.statusproduct);

  const queryParams = new URLSearchParams(window.location.search);

  // const handleClickCode = (code) => {
  //   setcodeproductState(code);
  // };

  // useEffect(() => {
  //   getproductbyCode();
  // }, []);
  // const getproductbyCode = async () => {
  //   try {
  //     const res = await customAxios.get(`/home/code?param=${codeproductState}`);
  //     setcodeproductState(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  // const getDetail = async () => {
  //   try {
  //     const dataDetail = await customAxios.get(`/home/code?param=${code}`);
  //     setdetailProduct(dataDetail.data);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   getDetail();
  // }, []);

  // console.log("testcodedata....", detailProduct);

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
  // console.log("geCate...", generalCategoryState);

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

  const handleChangeGeneralCategory = (e) => {
    setgeneralCategoryData(e);
  };
  const handleChangeCategory = (e) => {
    setcategoryData(e);
  };

  // const [editBook, seteditBook] = useState(bookState);
  const handleSubmit = async (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url
    const newData = [
      {
        ...itemDetail,
        name: nameproduct,
        code: codeproduct,
        price: priceproduct,
        quantity: Number(quantity0),
        // color: color0,
        // size: size0,
        categoryCode: categoryproduct,
        image: [imageproductData1, imageproductData2],
        description: description,
      },
      // {
      //   ...itemDetail,

      //   name: nameproduct,
      //   code: codeproduct,
      //   price: priceproduct,
      //   quantity: [
      //     // quantity0,
      //     // quantity1,
      //     // quantity2,
      //     // quantity3,
      //   ],
      //   color: [colorproduct, colorproduct, colorproduct, colorproduct],
      //   size: [sizeproduct, colorproduct, colorproduct, colorproduct],
      //   categoryCode: categoryproduct,
      //   image: [imageproductData1, imageproductData2],

      //   // generalCategory: generalCategoryproduct,
      //   description: description,
      // },
      // {
      //   ...itemDetail,
      //   name: nameproduct,
      //   code: codeproduct,
      //   price: priceproduct,
      //   quantity: [
      //     // quantity0,
      //     // quantity1,
      //     // quantity2,
      //     // quantity3,
      //   ],
      //   color: [colorproduct, colorproduct, colorproduct, colorproduct],
      //   size: [sizeproduct, colorproduct, colorproduct, colorproduct],
      //   categoryCode: categoryproduct,
      //   image: [imageproductData1, imageproductData2],

      //   // generalCategory: generalCategoryproduct,
      //   description: description,
      // },
      // {
      //   ...itemDetail,
      //   name: nameproduct,
      //   code: codeproduct,
      //   price: priceproduct,
      //   quantity: [
      //     // quantity0,
      //     // quantity1,
      //     // quantity2,
      //     // quantity3,
      //   ],
      //   color: [colorproduct, colorproduct, colorproduct, colorproduct],
      //   size: [sizeproduct, colorproduct, colorproduct, colorproduct],
      //   categoryCode: categoryproduct,
      //   image: [imageproductData1, imageproductData2],

      //   // generalCategory: generalCategoryproduct,
      //   description: description,
      // },
    ];
    const response = await customAxios.post(`/admin/item/update`, newData);
    // seteditBook(response.data);
    navigate("/productList");
    console.log("testdata", response.data);
  };

  const filterData = (detailProduct) => {
    detailProduct?.forEach((currentValue, index, arr) => {
      let code = currentValue.code;

      let objIndex = arr.findIndex((item) => {
        return item.code == code;
      });
      if (index == objIndex) {
        currentValue.color = [currentValue.color];
        currentValue.size = [currentValue.size];
        currentValue.quantity = [currentValue.quantity];
      } else {
        if (!arr[objIndex].color.includes(currentValue.color)) {
          arr[objIndex].color = [...arr[objIndex].color, currentValue.color];
        }
        if (!arr[objIndex].size.includes(currentValue.size)) {
          arr[objIndex].size = [...arr[objIndex].size, currentValue.size];
        }

        if (!arr[objIndex].quantity.includes(currentValue.quantity)) {
          arr[objIndex].quantity = [
            ...arr[objIndex].quantity,
            currentValue.quantity,
          ];
          // ?.reduce(function (a, b) {
          //   return a + b;
          // }, 0);

          // arr[objIndex].quantity.reduce((partialSum, a) => partialSum + a, 0);
        }
        currentValue.code = null;
      }
    });
    return detailProduct?.filter((e) => e.code !== null);
  };

  const codeProduct = filterData(productState)?.map((item) => item.code);
  // console.log("code..", codeProduct);

  const productByCode = filterData(detailProduct)
    ? filterData(detailProduct)[0]
    : "";

  // console.log("testCode...", productByCode);

  // console.log("probyCode...", filterData(detailProduct)[0]?.name);

  const convertToObj = (item) => {
    return {
      value: item,
      label: item,
    };
  };
  const codeDetail = codeProduct?.forEach((currentValue, index, arr) => {
    arr[index] = convertToObj(currentValue);
  });

  const handleCancel = (e) => {
    navigate("/productList");
  };

  const readId = params.readId;
  return (
    <div>
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Sport 9</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link"
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>

                <div
                  className="dropdown product nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveProduct(!isActiveProduct)}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {!isActiveProduct && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link active"
                          type="button"
                          to="/productList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Tất cả sản phẩm
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/addProduct"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Thêm sản phẩm
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
                    <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
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
                          Tất cả đơn hàng
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/successDeliver"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng thành công
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/deliveringBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng đang giao
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/confirmBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng chờ duyệt
                        </Link>
                      </div>
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

            <div className="control-addproduct container">
              <div className="mt-3 control-product-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Chỉnh sửa sản phẩm
                </h4>
                <Form>
                  <div className="row">
                    <div className="form-horizontal col-sm-8">
                      <div className="form-group">
                        <label for="">Tiêu đề sản phẩm:</label>
                        <input
                          value={nameproduct}
                          type="text"
                          className="form-control"
                          onChange={(e) => setnameproduct(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label for="email">Phân loại sản phẩm:</label>
                        {/* <Select
                          // ref={categoryCodeRef}
                          options={generalCategoryState}
                          isClearable={true}
                          className="form-control"
                          value={generalCategoryproduct}
                          placeholder="Chọn danh mục chung"
                          onChange={(e) =>
                            setgeneralCategoryproduct(e.target.value)
                          }
                        />
                        <Select
                          // ref={categoryCodeRef}
                          options={categoryState}
                          isClearable={true}
                          className="form-control"
                          value={categoryData}
                          placeholder="Chọn phân loại theo danh mục"
                          onChange={handleChangeCategory}
                        /> */}
                        <input
                          value={categoryproduct}
                          type="text"
                          className="form-control"
                          onChange={(e) => setcategoryproduct(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <div
                          // style={{ paddingLeft: "30px" }}
                          className="row mb-3"
                        >
                          <div style={{ display: "inline", width: "33%" }}>
                            <label for="email">Màu sắc:</label>
                            <input
                              // ref={colorRef}
                              // ref={(colorRef) =>
                              //   (colorRef = `color${i}Ref`)
                              // }
                              type="text"
                              name="color"
                              className="form-control col-md-4"
                              // onChange={(e) => handleInputChange()}
                            />
                          </div>
                          <div style={{ display: "inline", width: "33%" }}>
                            <label for="email">Kích cỡ:</label>
                            <input
                              // value={sizeproduct}
                              type="text"
                              name="size"
                              className="form-control col-md-4"
                              // onChange={(e) => setsizeproduct(e.target.value)}
                            />
                          </div>
                          <div style={{ display: "inline", width: "33%" }}>
                            {/* <div style={{ paddingLeft: "30px" }}> */}
                            <label for="email">Số lượng:</label>
                            <input
                              // value={quantity0}
                              type="number"
                              name="quantity"
                              className="form-control col-md-4"
                              // onChange={(e) =>
                              //   setquantity0(e.target.value)
                              // }
                            />
                          </div>
                          <div
                            style={{
                              display: "inline",
                              width: "10%",
                              paddingTop: "24px",
                            }}
                          ></div>
                        </div>
                        <div
                          // style={{ paddingLeft: "30px" }}
                          className="row mb-3"
                        >
                          <div style={{ display: "inline", width: "33%" }}>
                            <label for="email">Màu sắc:</label>
                            <input
                              // ref={colorRef}
                              // ref={(colorRef) =>
                              //   (colorRef = `color${i}Ref`)
                              // }
                              type="text"
                              name="color"
                              className="form-control col-md-4"
                              // onChange={(e) => handleInputChange()}
                            />
                          </div>
                          <div style={{ display: "inline", width: "33%" }}>
                            <label for="email">Kích cỡ:</label>
                            <input
                              value={sizeproduct}
                              type="text"
                              name="size"
                              className="form-control col-md-4"
                              onChange={(e) => setsizeproduct(e.target.value)}
                            />
                          </div>
                          <div style={{ display: "inline", width: "33%" }}>
                            {/* <div style={{ paddingLeft: "30px" }}> */}
                            <label for="email">Số lượng:</label>
                            <input
                              // value={quantity1}
                              type="number"
                              name="quantity"
                              className="form-control col-md-4"
                              // onChange={(e) =>
                              //   setquantity1(e.target.value)
                              // }
                            />
                          </div>
                          <div
                            style={{
                              display: "inline",
                              width: "10%",
                              paddingTop: "24px",
                            }}
                          ></div>
                        </div>
                      </div>
                      {/* <div className="form-group">
                        <label for="email">Địa chỉ:</label>
                        <input
                          // value={addressproduct}
                          type="text"
                          className="form-control"
                          placeholder="Enter address"
                          // onChange={(e) => setaddressproduct(e.target.value)}
                        />
                      </div> */}
                      <div className="form-group">
                        <label className="control-label">Mô tả sản phẩm:</label>
                        <textarea
                          value={description}
                          className="form-control"
                          rows="4"
                          cols="50"
                          // placeholder="Nhập mô tả sản phẩm"
                          onChange={(e) => setdescription(e.target.value)}
                        ></textarea>
                      </div>

                      {/* <div className="form-group">
                        <label for="">Trạng thái bạn đọc:</label>
                        <select
                          className="browser-default custom-select mb-2 mr-3"
                          value={statusproduct}
                          onChange={(e) => setstatusproduct(e.target.value)}
                        >
                          <option selected disabled>
                            Status product
                          </option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div> */}
                    </div>

                    <div class="form-horizontal col-sm-4">
                      <label>Hình ảnh sản phẩm</label>
                      <br />
                      <input
                        value={imageproductData1}
                        onChange={(e) => setImageproductData1(e.target.value)}
                        name="image"
                        type="text"
                      />
                      <img
                        variant="bottom"
                        width={250}
                        height={300}
                        src={imageproductData1}
                      />
                      <input
                        value={imageproductData2}
                        onChange={(e) => setImageproductData2(e.target.value)}
                        name="image"
                        type="text"
                      />
                      <img
                        variant="bottom"
                        width={250}
                        height={300}
                        src={imageproductData2}
                      />
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

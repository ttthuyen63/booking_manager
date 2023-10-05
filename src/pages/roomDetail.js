import {
  faAddressBook,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faBuilding,
  faBuildingCircleArrowRight,
  faBuildingCircleExclamation,
  faBuildingFlag,
  faBuildingUser,
  faCaretDown,
  faFileCirclePlus,
  faHome,
  faHouseChimneyUser,
  faHouseCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../config/api";
import { logout } from "../redux/userSlice";
import ConvertToString from "../components/ConvertToString";
import { currencyFormat } from "../ultils/constant";
import productData from "../components/product";

export default function RoomDetail() {
  const params = useParams();
  const code = params.code;
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  let productList = productData.getAllProducts();
  console.log("proli,,,", productList);
  const [detailProduct, setdetailProduct] = useState([]);
  console.log("detailProduct...", detailProduct);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filterData = (props) => {
    props?.forEach((currentValue, index, arr) => {
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
    return props?.filter((e) => e.code !== null);
  };

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    try {
      const dataDetail = await customAxios.get(`/home/code?param=${code}`);
      setdetailProduct(dataDetail.data);
    } catch (error) {}
  };
  const detail = filterData(detailProduct)[0];
  // const detailImage = filterData(detailProduct)
  //   ? filterData(detailProduct)[0].image[0]
  //   : "";
  // const detailImage = detail ? detail?.image[0] : "";

  console.log("data test...", detailProduct);
  console.log("data test...", filterData(detailProduct));
  // console.log("name test...", filterData(detailProduct).name);
  const sumQuantity = detail?.quantity[0].reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  console.log("sumqua,,,", sumQuantity);
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
                    <FontAwesomeIcon icon={faBuilding} /> Quản lý phòng
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
                          Tất cả phòng
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
                    </div>
                  )}
                </div>
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

            <div className="col-sm-12" style={{ padding: 0 }}>
              <div class="control-addReader container">
                <div class="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                  <h4 class="ml-0 mt-0" style={{ textAlign: "center" }}>
                    Thông tin phòng
                  </h4>
                  <div class="row">
                    <div class="col-sm-4 position-left">
                      <img
                        variant="bottom"
                        width={400}
                        height={450}
                        src={require("../image/h-mong.jpg")}
                      />
                    </div>
                    <div class="col-sm-8 position-right">
                      <div
                        className="form-group"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Table
                          striped
                          bordered
                          hover
                          size="sm"
                          style={{
                            width: "75%",
                          }}
                        >
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Tên phòng:{" "}
                            </th>
                            <td>Phòng Upper Deluxe</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Mã phòng:{" "}
                            </th>
                            <td>P01</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Phân loại:{" "}
                            </th>
                            <td>Phòng đơn</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Mô tả phòng:{" "}
                            </th>
                            <td>
                              Sở hữu diện tích lên đến 64m2, 16 phòng H'mong
                              Suite của Pao’s Sapa Leisure được thiết kế ấn
                              tượng với phòng ngủ riêng biệt, tiện nghi hoàn hảo
                              cùng ban công rộng mở. Tất cả hứa hẹn mang đến cho
                              du khách không gian lý tưởng để thư giãn sau ngày
                              dài tham quan, mua sắm tại thị trấn Sapa xinh đẹp.
                              <br />
                              - Diện tích: 64m2
                              <br />
                              - Diện tích ban công: 15m2
                              <br />
                              - Số lượng: 16 phòng
                              <br />
                              - Hướng nhìn: Thung lũng
                              <br />- Phòng ngủ riêng biệt Bồn tắm và vòi hoa
                              sen
                            </td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Số lượng phòng:{" "}
                            </th>
                            <td>5</td>
                          </tr>
                          <tr>
                            <th style={{ padding: "10px", width: "200px" }}>
                              Giá phòng:{" "}
                            </th>
                            <td>{currencyFormat(800000)}/phòng</td>
                          </tr>
                        </Table>
                      </div>
                    </div>
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

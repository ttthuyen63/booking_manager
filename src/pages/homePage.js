import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faAddressBook,
  faBook,
  faBookBookmark,
  faTimesCircle,
  faArrowAltCircleRight,
  faCartShopping,
  faHandHolding,
  faBoxesPacking,
  faBoxTissue,
  faBoxArchive,
  faBoxes,
  faCircleNotch,
  faDollyBox,
  faHandHoldingDroplet,
  faHandHoldingUsd,
  faHandsHoldingCircle,
  faFileCirclePlus,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customAxios } from "../config/api";
import { addListBook } from "../redux/orderSlice";
import { useState } from "react";
import { addListproduct } from "../redux/productSlice";
import { logout } from "../redux/userSlice";
import Widget from "../components/Widget";
import Chart from "../components/Chart";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";

export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [bookStateLength, setbookStateLength] = useState(null);
  const [productStateLength, setproductStateLength] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getBookApi();
  //   getproductApi();
  // }, []);
  // const getBookApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/book/info/get-all");
  //     dispatch(addListBook(res.data));
  //     setbookStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };
  // const getproductApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/users/get-all");
  //     dispatch(addListproduct(res.data));
  //     setproductStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  return (
    <div className="row">
      <div className="col-sm-2" style={{ padding: 0 }}>
        {/* <div className="menu">
          <h4 className="menu-header">KMA Booking</h4>
          <div className="d-flex align-items-start">
            <div className="nav flex-column nav-pills">
              <Link
                className="nav-link active"
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
                {isActiveProduct && (
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      <Link
                        className="nav-link"
                        type="button"
                        to="/roomlist"
                        style={{ color: "white", textDecoration: "none" }}
                      >
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
        </div> */}
        <SideBar menu={sidebar_menu} />
      </div>

      <div className="col-sm-10" style={{ padding: 0 }}>
        <div className="content">
          <div className="content-header">
            <h5 className="content-account">
              <Button
                className="btn-login"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Thoát
              </Button>
            </h5>
          </div>

          <div style={{ textAlign: "center" }}>
            <img
              src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
              style={{ width: "200px" }}
            />
          </div>
          <h2 className="mt-4" style={{ textAlign: "center" }}>
            Thống kê
          </h2>

          <div className="widgets" style={{ justifyContent: "center" }}>
            <Widget type="product"></Widget>
            <Widget type="order" />
            <Widget type="earning" />
            {/* <Widget type="balance" /> */}
          </div>
          <div>
            {/* <span>Biến động doanh thu theo tháng nửa đầu năm 2023</span> */}
          </div>
          {/* <div className="charts">
            <Chart title="Biến động doanh thu 6 tháng qua" aspect={2 / 1} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

// "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

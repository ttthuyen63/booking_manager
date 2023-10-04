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
import { addListproduct } from "../redux/roomSlice";
import { logout } from "../redux/userSlice";
import Widget from "../components/Widget";
// import Chart from "../components/Chart";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import Chart from "react-apexcharts";
import { currencyFormat } from "../ultils/constant";
import { DataGrid } from "@mui/x-data-grid";

export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [moneyState, setmoneyState] = useState(null);
  const [productStateLength, setproductStateLength] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderState, setorderState] = useState(null);

  useEffect(() => {
    getmoneyApi();
  }, []);
  const getmoneyApi = async () => {
    try {
      const res = await customAxios.get("/booking/month");
      // dispatch(addListBook(res.data));
      setmoneyState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  console.log("money...", moneyState);

  useEffect(() => {
    getorderApi();
  }, []);
  const getorderApi = async () => {
    try {
      const res = await customAxios.get("/booking/list");
      setorderState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  // const getproductApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/users/get-all");
  //     dispatch(addListproduct(res.data));
  //     setproductStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  const doanhthu = moneyState?.map((item) => {
    return item?.money;
  });
  console.log("doanhthu", doanhthu);
  const calculateSum = () => {
    let sum = 0;
    doanhthu?.forEach((number) => {
      sum += number;
    });
    return sum;
  };
  console.log("Tổng", calculateSum(doanhthu));

  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
        ],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: doanhthu,
        // data: [30, 40, 45, 50, 49],
      },
      // {
      //   name: "People Died",
      //   data: [3, 60, 35, 80, 49, 70, 20, 81],
      // },
    ],
  });

  const latestOrders = orderState?.slice(-5);
  console.log("lastest...", latestOrders);
  return (
    <div className="row">
      <div className="col-sm-3" style={{ padding: 0 }}>
        <SideBar menu={sidebar_menu} />
      </div>

      <div className="col-sm-9" style={{ padding: 0 }}>
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
            {/* <img
              // src={require("../assets/images/e2.png")}
              src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
              style={{ width: "200px" }}
            /> */}
          </div>
          <h1 className="" style={{ textAlign: "center" }}>
            Thống kê
          </h1>

          <div className="row statisc">
            <div className="col-1"></div>
            <div className="col-6 widgets" style={{ justifyContent: "center" }}>
              <div className="left">
                <Widget type="product" />
                <Widget type="earning" />
              </div>
              <div className="right">
                <Widget type="balance" />
                <Widget type="order" />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-3">
              <h3>Doanh thu</h3>
              <table className="table recently-violated">
                <thead>
                  <tr>
                    <th scope="col">Tháng</th>
                    <th scope="col">Doanh thu</th>
                  </tr>
                </thead>
                <tbody id="myTable">
                  <td>
                    <tr>Tháng 2</tr>
                    <tr>Tháng 3</tr>
                    <tr>Tháng 4</tr>
                    <tr>Tháng 5</tr>
                    <tr>Tháng 6</tr>
                    <tr>Tháng 7</tr>
                  </td>
                  <td>
                    {moneyState?.map((item, index) => (
                      <tr>{currencyFormat(item?.money)}</tr>
                    ))}
                  </td>
                  <div></div>
                </tbody>
              </table>
            </div>
          </div>
          <h2 style={{ textAlign: "center" }}>Danh sách các đơn mới nhất</h2>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <table className="table recently-violated">
                <thead>
                  <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Mã khách sạn</th>
                    <th scope="col">Tên phòng</th>
                    <th scope="col">Số phòng</th>
                    <th scope="col">Họ tên KH</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Ngày đến</th>
                    <th scope="col">Ngày đi</th>
                    <th scope="col">Tổng giá</th>
                  </tr>
                </thead>
                {/* ----------------------------------------- */}
                <tbody id="myTable">
                  {latestOrders?.map((item, index) => (
                    <tr>
                      <td>HĐ{item?.id}</td>
                      <td>{item?.hotel_id}</td>
                      <td>{item?.room_name}</td>
                      <td>{item?.room_number}</td>
                      <td>{item?.customer_name}</td>
                      <td>{item?.customer_phone}</td>
                      <td>{item?.start_date}</td>
                      <td>{item?.end_date}</td>
                      <td>{currencyFormat(item?.price)}</td>
                    </tr>
                  ))}
                  <div></div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"

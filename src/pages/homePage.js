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

export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [moneyState, setmoneyState] = useState(null);
  const [productStateLength, setproductStateLength] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  // const getproductApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/users/get-all");
  //     dispatch(addListproduct(res.data));
  //     setproductStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: [30, 40, 45, 50, 49],
      },
      // {
      //   name: "People Died",
      //   data: [3, 60, 35, 80, 49, 70, 20, 81],
      // },
    ],
  });

  return (
    <div className="row">
      <div className="col-sm-2" style={{ padding: 0 }}>
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
              // src={require("../assets/images/e2.png")}
              src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
              style={{ width: "200px" }}
            />
          </div>
          <h2 className="mt-4" style={{ textAlign: "center" }}>
            Thống kê
          </h2>

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
            {/* <h1>
              React Charts Demo <i class="fas fa-user"></i>{" "}
            </h1> */}
            {/* <div className="col-4">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  width="450"
                />
              </div> */}

            <div className="col-5">
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                width="450"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"

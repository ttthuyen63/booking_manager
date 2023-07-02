import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { customAxios } from "../config/api";
import { useEffect, useState } from "react";
import { currencyFormat } from "../ultils/constant";
import { Link } from "react-router-dom";
const Widget = ({ type, amount }) => {
  let data;
  const [roomStateLength, setroomStateLength] = useState(null);
  const [bookingLength, setbookingLength] = useState(null);
  const [bookingRoomLength, setbookingRoomLength] = useState(null);
  const [revenueState, setrevenueState] = useState(null);

  useEffect(() => {
    getroomApi();
  }, []);
  const getroomApi = async () => {
    try {
      const res = await customAxios.get("/room/list");
      setroomStateLength(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  console.log("room...", roomStateLength);
  // const filterData = (productState) => {
  //   productState?.forEach((currentValue, index, arr) => {
  //     let code = currentValue.code;

  //     let objIndex = arr.findIndex((item) => {
  //       return item.code == code;
  //     });
  //     if (index == objIndex) {
  //       currentValue.color = [currentValue.color];
  //       currentValue.size = [currentValue.size];
  //       currentValue.quantity = [currentValue.quantity];
  //     } else {
  //       if (!arr[objIndex].color.includes(currentValue.color)) {
  //         arr[objIndex].color = [...arr[objIndex].color, currentValue.color];
  //       }
  //       if (!arr[objIndex].size.includes(currentValue.size)) {
  //         arr[objIndex].size = [...arr[objIndex].size, currentValue.size];
  //       }

  //       if (!arr[objIndex].quantity.includes(currentValue.quantity)) {
  //         arr[objIndex].quantity = [
  //           ...arr[objIndex].quantity,
  //           currentValue.quantity,
  //         ];
  //       }
  //       currentValue.code = null;
  //     }
  //   });
  //   return productState?.filter((e) => e.code !== null);
  // };
  // const amountProducts = filterData(productState)?.length;

  useEffect(() => {
    getbookingApi();
  }, []);
  const getbookingApi = async () => {
    try {
      const res = await customAxios.get("/booking/list");
      setbookingLength(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("booking...", bookingLength);

  useEffect(() => {
    getbookingRoomApi();
  }, []);
  const getbookingRoomApi = async () => {
    try {
      const res = await customAxios.get("/room/roomstatus?status=true");
      setbookingRoomLength(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("bookingRoom...", bookingRoomLength);

  // http://localhost:8080/room/roomstatus?status=true

  useEffect(() => {
    getrevenueApi();
  }, []);
  const getrevenueApi = async () => {
    try {
      const res = await customAxios.get("/booking/month");
      setrevenueState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("revenue...", revenueState);
  // const amountRevenues = revenueState?.data.reduce((accumulator, object) => {
  //   return accumulator + object.totalRevenue;
  // }, 0);
  // console.log("reve..", amountRevenues);
  // const sumRevenues = currencyFormat(amountRevenues);

  switch (type) {
    case "product":
      data = {
        amount: roomStateLength?.length,
        title: "PHÒNG",
        isMoney: false,
        link: "See all rooms",
        icon: (
          <Inventory2OutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        amount: bookingLength?.length,
        title: "ĐƠN ĐẶT",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        // amount: sumRevenues,
        title: "DOANH THU",
        // isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        amount: bookingRoomLength?.length,
        title: "PHÒNG ĐANG ĐẶT",
        // isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>

        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon /> */}
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

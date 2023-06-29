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
  const [productState, setproductState] = useState(null);
  const [billState, setbillState] = useState(null);
  const [revenueState, setrevenueState] = useState(null);

  useEffect(() => {
    getproductApi();
  }, []);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/home/all");
      setproductState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const filterData = (productState) => {
    productState?.forEach((currentValue, index, arr) => {
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
        }
        currentValue.code = null;
      }
    });
    return productState?.filter((e) => e.code !== null);
  };
  const amountProducts = filterData(productState)?.length;
  //   console.log("pro...", amountProducts);

  useEffect(() => {
    getbillApi();
  }, []);
  const getbillApi = async () => {
    try {
      const res = await customAxios.get("/admin/bill/all");
      setbillState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("bill...", billState);
  const amountBills = billState?.length;

  useEffect(() => {
    getrevenueApi();
  }, []);
  const getrevenueApi = async () => {
    try {
      const res = await customAxios.get("/admin/bill/revenue/all");
      setrevenueState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("revenue...", revenueState?.data);
  const amountRevenues = revenueState?.data.reduce((accumulator, object) => {
    return accumulator + object.totalRevenue;
  }, 0);
  console.log("reve..", amountRevenues);
  const sumRevenues = currencyFormat(amountRevenues);

  switch (type) {
    case "product":
      data = {
        amount: amountProducts,
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
        amount: amountBills,
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
        amount: sumRevenues,
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
        title: "BALANCE",
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

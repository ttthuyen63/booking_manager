import React from "react";

const StatusBill = (props) => {
  const { item } = props;
  const { deli } = props;

  console.log("item...", item);
  console.log("deli...", deli);
  if (item === false) {
    return (
      <div
        style={{ color: "#fff  !important", background: "green !important" }}
      >
        {item === false ? "Chờ xác nhận" : ""}
      </div>
    );
  } else if (item === true) {
    return (
      <div style={{ color: "#fff  !important", background: "blue !important" }}>
        {item === true ? "Đã xác nhận" : ""}
      </div>
    );
  }

  if (deli === false) {
    return (
      <div
        style={{ color: "#fff  !important", background: "green !important" }}
      >
        {deli === false ? "Chờ giao hàng" : ""}
      </div>
    );
  } else if (deli === true) {
    return (
      <div style={{ color: "#fff  !important", background: "blue !important" }}>
        {deli === true ? "Giao hàng thành công" : ""}
      </div>
    );
  } else if (deli === null) {
    return (
      <div style={{ color: "#fff  !important", background: "blue !important" }}>
        {deli === null ? "" : ""}
      </div>
    );
  }
};
export default StatusBill;

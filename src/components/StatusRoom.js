import React from "react";

const StatusRoom = (props) => {
  const { item } = props;

  console.log("item...", item);
  if (item == true) {
    return (
      <div
        className="RoomAvailable"
        style={{ color: "#fff  !important", background: "green !important" }}
      >
        {item === true ? "Đang trống" : ""}
      </div>
    );
  } else if (item == false) {
    return (
      <div
        className="RoomUnAvailable"
        style={{ color: "#fff  !important", background: "blue !important" }}
      >
        {item === false ? "Đã được đặt" : ""}
      </div>
    );
  }
};
export default StatusRoom;

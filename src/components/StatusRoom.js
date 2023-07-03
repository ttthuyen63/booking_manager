import React from "react";

const StatusRoom = (props) => {
  const { item } = props;

  console.log("item...", item);
  if (item == false) {
    return (
      <div
        className="RoomAvailable"
        style={{ color: "#fff  !important", background: "green !important" }}
      >
        {item === false ? "Đang trống" : ""}
      </div>
    );
  } else if (item == true) {
    return (
      <div
        className="RoomUnAvailable"
        style={{ color: "#fff  !important", background: "blue !important" }}
      >
        {item === true ? "Đã được đặt" : ""}
      </div>
    );
  }
};
export default StatusRoom;

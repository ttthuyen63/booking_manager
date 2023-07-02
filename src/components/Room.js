import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Room = (props) => {
  const { item } = props;

  console.log("item...", item);

  if (item == 1) {
    return <span>Phòng đơn</span>;
  } else if (item == 2) {
    return <span>Phòng đôi</span>;
  }

  //   switch (item) {
  //     case 1:
  //       return (
  //         <span>
  //           <FontAwesomeIcon icon={faStar} />
  //         </span>
  //       );
  //     case 2:
  //       <span>
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //       </span>;
  //       break;
  //     case 3:
  //       <span>
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //       </span>;
  //       break;
  //     case 4:
  //       <span>
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //         <FontAwesomeIcon icon={faStar} />
  //       </span>;
  //       break;
  //     case "5":
  //       return (
  //         <span>
  //           <FontAwesomeIcon icon={faStar} />
  //         </span>
  //       );
  //       break;
  //   }
};
export default Room;

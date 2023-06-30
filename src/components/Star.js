import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Star = (props) => {
  const { item } = props;

  console.log("item...", item);

  switch (item) {
    case 1:
      return (
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
      break;
    case 2:
      <span>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </span>;
      break;
    case 3:
      <span>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </span>;
      break;
    case 4:
      <span>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </span>;
      break;
    case "5":
      return (
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
      break;
  }
};
export default Star;

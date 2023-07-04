import React, { useState, useEffect } from "react";
import { Button, Container, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faCaretDown,
  faCheckCircle,
  faFileCirclePlus,
  faHome,
  faPencilSquare,
  faPlusCircle,
  faSave,
  faStickyNote,
  faTimesCircle,
  faTrash,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  ModalTitle,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListroom } from "../redux/roomSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
// import { Select } from "@mui/material";
import Select from "react-select";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Slide } from "react-slideshow-image";
import Room from "../components/Room";
import { addListhotel } from "../redux/hotelSlice";
import { useStepContext } from "@mui/material";
import { useRef } from "react";
import StatusRoom from "../components/StatusRoom";
import FileResizer from "react-image-file-resizer";

export default function RoomListPage() {
  const [roomState, setroomState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(roomState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterroom, setfilterroom] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActiveroom, setisActiveroom] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [imageroomData1, setImageroomData1] = useState();
  const [detail, setDetail] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [modal, setmodal] = useState(false);
  const [hotelState, sethotelState] = useState(null);
  const [hotelNameState, sethotelNameState] = useState(null);
  const [hotelNameData, sethotelNameData] = useState(null);
  const room_nameRef = useRef(null);
  const room_numberRef = useRef(null);
  const phanloaiRef = useRef(null);
  const maxpeopleRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const [files, setFile] = useState();
  const [phanloai, setphanloai] = useState();
  const [phanloaiData, setphanloaiData] = useState();

  console.log("roomState...", roomState);
  const roomList = useSelector((state) => state.roomReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  const convertToObj = (item) => {
    return {
      value: item,
      label: item,
    };
  };

  useEffect(() => {
    gethotelNameApi();
  }, []);
  const gethotelNameApi = async () => {
    try {
      const res = await customAxios.get("/hotel/listidhotel");
      res.data.forEach((currentValue, index, arr) => {
        arr[index] = convertToObj(currentValue);
      });
      sethotelNameState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  console.log("hotelNameState...", hotelNameState);
  // console.log("hotelState...", hotelState);

  useEffect(() => {
    getroomApi();
  }, []);
  const getroomApi = async () => {
    try {
      const res = await customAxios.get("/room/list");
      dispatch(addListroom(res.data));
      setroomState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  console.log("test", roomState);

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async (id) => {
    try {
      const detail = await customAxios.get(`/room?id=${id}`);
      setDetail(detail?.data);
    } catch (error) {}
    setShowDetail(true);
  };

  console.log("detail..", detail);

  // const filterData = (props) => {
  //   props?.forEach((currentValue, index, arr) => {
  //     let hotel_id = currentValue.hotel_id;
  //     let room_name = currentValue.room_name;

  //     let objIndex = arr.findIndex((item) => {
  //       return item.hotel_id == hotel_id && item.room_name == room_name;
  //     });
  //     if (index == objIndex) {
  //       currentValue.room_number = [currentValue.room_number];
  //     } else {
  //       if (!arr[objIndex].room_number.includes(currentValue.room_number)) {
  //         arr[objIndex].room_number = [
  //           ...arr[objIndex].room_number,
  //           currentValue.room_number,
  //         ];
  //       }

  //       currentValue.code = null;
  //     }
  //   });
  //   return props?.filter((e) => e.code !== null);
  // };
  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editroom/" + item?.code, {
      state: item,
    });
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (id) => {
    setdeleteCode(id);
    setshowDel(true);
  };

  const handleDelete = async () => {
    // console.log("id: ", deleteId);
    try {
      await customAxios.delete(`/room?id=${deleteCode}`);
      getroomApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  // const goToDetail = (code) => {
  //   navigate("/roomList/" + code);
  // };

  const goToDetail = (code) => {
    navigate("/roomDetail/" + code);
  };

  const phanloaibed = [
    { value: "1", label: "Phòng đơn" },
    { value: "2", label: "Phòng đôi" },
  ];

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...roomState];
    // var searchList = [...filterData(roomState)];
    searchList = searchList?.filter((item) => {
      return item?.room_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filterroom) {
      return roomState;
      // return filterData(roomState);
    }
    return roomState?.filter(
      // return filterData(roomState)?.filter(
      (item) => item?.hotel_id === filterroom
    );
  }

  var filterList = useMemo(getFilterList, [filterroom, roomState]);
  // var filterList = useMemo(getFilterList, [filterroom, filterData(roomState)]);
  function handleChange(event) {
    setfilterroom(event.target.value);
  }

  const navigate = useNavigate();

  const uploader = new Uploader({
    // Get production API keys from Upload.io
    apiKey: "free",
  });

  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };
  // const slideImages = detail?.map((item) => {
  //   return item?.images;

  //   // {
  //   //   url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  //   // },
  //   // {
  //   //   url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  //   // },
  // });

  const handleChangeHotelName = (e) => {
    sethotelNameData(e);
  };

  const handleChangePhanLoai = (e) => {
    setphanloaiData(e);
  };

  // const handleChangeFile = (event) => {
  //   setFile(event.target.files);
  //   console.log("img...", event.target.files);
  // };

  const fileNames = [];
  for (let i = 0; i < files?.length; i++) {
    const file = files[i];
    const fileName = file.name;
    console.log("filename...", fileName); // Lấy tên tệp tin
  }

  const [randomNumber, setRandomNumber] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const generateRandomNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 100) + 1; // Sinh số ngẫu nhiên từ 1 đến 100
    } while (generatedNumbers.includes(newNumber)); // Kiểm tra tính duy nhất của số mới

    setRandomNumber(newNumber);
    setGeneratedNumbers([...generatedNumbers, newNumber]);
  };

  const handleAdd = () => {
    setmodal(true);
    generateRandomNumber();
  };

  const randomID = generatedNumbers?.toString();
  console.log("random...", randomID);

  const [base64Images, setBase64Images] = useState([]);

  const handleChangeFile = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      FileResizer.imageFileResizer(
        files[i],
        800, // chiều rộng mới
        800, // chiều cao mới
        "JPEG", // định dạng đầu ra
        100, // chất lượng
        0, // góc quay (0 là không quay)
        (base64Image) => {
          setBase64Images((prevImages) => [...prevImages, base64Image]);
        },
        "base64" // đầu ra là chuỗi base64
      );
    }
  };

  const outputImg = base64Images.map((item) => item.split(",")[1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: randomID,
      hotel_id: hotelNameData?.value,
      room_number: room_numberRef.current.value,
      room_name: room_nameRef.current.value,
      number_bed: phanloaiData?.value,
      maximum_quantity: maxpeopleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      listURL: outputImg,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/room", requestOptions)
      .then((response) => response.text())
      .then((result) => window.location.reload())
      .catch((error) => console.log("error", error));
  };

  function countNestedArrayElements(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      if (Array.isArray(element)) {
        count += countNestedArrayElements(element); // Đệ quy gọi lại hàm với phần tử lồng nhau
      } else {
        count++;
      }
    }

    return count;
  }

  const IdHotelList = roomState?.map((item) => {
    return item?.hotel_id;
  });
  const uniqueArr = Array.from(new Set(IdHotelList));
  console.log("provinceList", uniqueArr);

  return (
    <div>
      {show === false ? (
        <div>
          {roomState?.map((item, index) => (
            <Modal isOpen={showDel} onHide={handleClose}>
              <ModalHeader closeButton>
                <div>Bạn có chắc là sẽ xóa?</div>
              </ModalHeader>
              <ModalBody>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
          ))}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal isOpen={showDel} onHide={handleClose}>
              <ModalHeader closeButton>
                {/* <div>Bạn có chắc là sẽ xóa?</div> */}
              </ModalHeader>
              <ModalBody>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </ModalBody>
              <ModalFooter>
                {/* <Button variant="danger" onClick={() => handleDelete(item?.id)}> */}
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
          ))}
        </div>
      )}

      <div>
        {/* {detail?.map((item, index) => (
          <Modal
            size="lg"
            isOpen={showDetail}
            toggle={() => setShowDetail(!showDetail)}
          >
            <ModalHeader
              toggle={() => setShowDetail(!showDetail)}
            ></ModalHeader>
            <ModalBody>
              <form>
                <Row>
                  <Col lg={6}>
                    <div className="slide-container">
                      <Slide>
                        {slideImages[0]?.map((slideImage, index) => (
                          <div key={index}>
                            <div
                              style={{
                                ...divStyle,
                                backgroundImage: `${slideImage}`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </Slide>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <h2>{item?.name}</h2>
                  </Col>
                </Row>
              </form>
            </ModalBody>
          </Modal>
        ))} */}
      </div>
      <div>
        <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
          <ModalHeader toggle={() => setmodal(!modal)}>THÊM PHÒNG</ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col lg={12}>
                  <label>Mã khách sạn</label>
                  <Select
                    options={hotelNameState}
                    isClearable={true}
                    className="form-control"
                    value={hotelNameData}
                    onChange={handleChangeHotelName}
                  />
                </Col>
                <Col lg={12}>
                  <label>Tên phòng</label>
                  <input
                    ref={room_nameRef}
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Số phòng</label>
                  <input
                    ref={room_numberRef}
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Phân loại phòng</label>
                  <br></br>

                  <Select
                    // ref={categoryCodeRef}
                    options={phanloaibed}
                    isClearable={true}
                    className="form-control"
                    value={phanloaiData}
                    // placeholder="Chọn khách sạn"
                    onChange={handleChangePhanLoai}
                  />
                </Col>
                <Col lg={12}>
                  <label>Số lượng khách tối đa</label>
                  <input
                    ref={maxpeopleRef}
                    type="text"
                    className="form-control"
                    // placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Giá</label>
                  <input
                    ref={priceRef}
                    type="text"
                    className="form-control"
                    // placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Mô tả phòng</label>
                  <input
                    ref={descriptionRef}
                    type="text"
                    className="form-control"
                    // placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Hình ảnh: </label>
                  <br />
                  <input type="file" multiple onChange={handleChangeFile} />
                </Col>
              </Row>
              <Button
                type="button"
                className="btn btn-success mt-3"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faSave} /> Lưu thông tin
              </Button>
              <Button
                type="button"
                className="btn btn-danger mt-3 ml-3"
                // onClick={handleCancel}
              >
                &times; Hủy
              </Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
      <div className="row">
        <div className="col-sm-3" style={{ padding: 0 }}>
          <SideBar menu={sidebar_menu} />
        </div>

        <div className="col-sm-9" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h5 className="content-account">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Thoát
                </Button>
              </h5>
            </div>

            <div className="begin-item">
              <button
                className="btn-new"
                type="button"
                // onClick={() => setmodal(true)}
                onClick={() => handleAdd()}
              >
                THÊM PHÒNG
              </button>
              <form className="form-inline w-50">
                <select
                  className="browser-default custom-select mb-2 mr-3"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Lọc theo Khách sạn
                  </option>
                  <option value="">Tất cả</option>
                  {uniqueArr?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}

                  {/* <option value="trang-phuc_bong-chuyen">Phòng đôi</option> */}
                </select>
              </form>
            </div>
            <div className="control-hotel">
              <div className="mt-3 control-hotel-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách phòng</h2>
                  <div className="item-search">
                    <input
                      type="text"
                      className="item-search-input"
                      placeholder="Tìm kiếm ..."
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">Mã khách sạn</th>
                      <th scope="col">Tên phòng</th>
                      <th scope="col">Phân loại</th>
                      <th scope="col">Số phòng</th>
                      {/* <th scope="col">Giới hạn</th> */}
                      <th scope="col">Giá</th>
                      {/* <th scope="col">Số lượng phòng</th> */}
                      <th scope="col">Tình trạng</th>
                      <th scope="col">Xóa</th>
                    </tr>
                  </thead>
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          <td>{item?.hotel_id}</td>
                          <td>{item?.room_name}</td>
                          <td>
                            <Room item={item?.number_bed} />
                          </td>
                          <td>{item?.room_number}</td>
                          {/* <td>{item?.maximum_quantity}</td> */}
                          <td>{currencyFormat(item?.price)}</td>
                          <td>
                            <StatusRoom item={item?.status} />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.id)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                              </span>
                            </button>
                          </td>
                          {/* <td>{item?.room_number?.length}</td> */}
                          {/* <td>{countNestedArrayElements(item?.room_number)}</td> */}
                          {/* <td>
                            <button
                              onClick={() => goToDetail(item?.id)}
                              variant="primary"
                              type="button"
                              className="btn btn-warning btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} /> Xem
                              </span>
                            </button>
                          </td> */}
                        </tr>
                      ))}
                      <div></div>
                    </tbody>
                  ) : (
                    ""
                  )}
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          <td>{item?.hotel_id}</td>
                          <td>{item?.room_name}</td>
                          <td>
                            <Room item={item?.number_bed} />
                          </td>
                          <td>{item?.room_number}</td>
                          {/* <td>{item?.maximum_quantity}</td> */}
                          <td>{currencyFormat(item?.price)}</td>
                          <td>
                            <StatusRoom item={item?.status} />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.id)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                              </span>
                            </button>
                          </td>
                          {/* <td>{item?.room_number?.length}</td> */}
                          {/* <td>{countNestedArrayElements(item?.room_number)}</td> */}
                          {/* <td>
                            <button
                              onClick={() => goToDetail(item?.id)}
                              variant="primary"
                              type="button"
                              className="btn btn-warning btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} /> Xem
                              </span>
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    ""
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

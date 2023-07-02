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

  console.log("roomState...", roomState);
  const roomList = useSelector((state) => state.roomReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    gethotelApi();
  }, []);
  const gethotelApi = async () => {
    try {
      const res = await customAxios.get("/hotel");
      dispatch(addListhotel(res.data));
      sethotelState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  console.log("hotelState...", hotelState);

  useEffect(() => {
    getroomApi();
  }, []);
  const getroomApi = async () => {
    try {
      const res = await customAxios.get("/room");
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
      const detail = await customAxios.get(`/room/${id}`);
      setDetail(detail?.data);
    } catch (error) {}
    setShowDetail(true);
  };

  console.log("detail..", detail);

  const filterData = (props) => {
    props?.forEach((currentValue, index, arr) => {
      let hotel_id = currentValue.hotel_id;
      let room_name = currentValue.room_name;

      let objIndex = arr.findIndex((item) => {
        return item.hotel_id == hotel_id && item.room_name == room_name;
      });
      if (index == objIndex) {
        currentValue.room_number = [currentValue.room_number];
      } else {
        if (!arr[objIndex].room_number.includes(currentValue.room_number)) {
          arr[objIndex].room_number = [
            ...arr[objIndex].room_number,
            currentValue.room_number,
          ];
        }

        currentValue.code = null;
      }
    });
    return props?.filter((e) => e.code !== null);
  };
  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editroom/" + item?.code, {
      state: item,
    });
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = () => {
    setdeleteCode();
    setshowDel(true);
  };

  const handleDelete = async () => {
    // console.log("id: ", deleteId);
    try {
      await customAxios.post(`/room/${deleteCode}`);
      getroomApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  // const goToDetail = (code) => {
  //   navigate("/roomList/" + code);
  // };

  const goToDetail = () => {
    navigate("/roomDetail");
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...filterData(roomState)];
    searchList = searchList?.filter((item) => {
      return item?.room_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filterroom) {
      return filterData(roomState);
    }
    return filterData(roomState)?.filter(
      (item) => item?.hotel_id === filterroom
    );
  }

  var filterList = useMemo(getFilterList, [filterroom, filterData(roomState)]);
  function handleChange(event) {
    setfilterroom(event.target.value);
  }

  const navigate = useNavigate();

  console.log("filterdata...", filterData(roomState));

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

  return (
    <div>
      {show === false ? (
        <div>
          {filterData(roomState)?.map((item, index) => (
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
                    // ref={categoryCodeRef}
                    options={hotelNameState}
                    isClearable={true}
                    className="form-control"
                    value={hotelNameData}
                    placeholder="Chọn danh mục chung"
                    onChange={handleChangeHotelName}
                  />
                </Col>
                <Col lg={12}>
                  <label>Tên phòng</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Số phòng</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Phân loại phòng</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Số lượng khách tối đa</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Giá</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Mô tả phòng</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên khách sạn"
                  />
                </Col>
                <Col lg={12}>
                  <label>Hình ảnh: </label>
                  <br />
                  <UploadButton
                    uploader={uploader}
                    options={{ multi: true }}
                    onComplete={(files) => console.log(files)}
                  >
                    {({ onClick }) => (
                      <button onClick={onClick}>Upload a file...</button>
                    )}
                  </UploadButton>
                </Col>
              </Row>
              <Button
                type="button"
                className="btn btn-success mt-3"
                // onClick={handleSubmit}
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
                onClick={() => setmodal(true)}
              >
                THÊM PHÒNG
              </button>
              <form className="form-inline w-50">
                <select
                  className="browser-default custom-select mb-2 mr-3"
                  // value={filterStatus}
                  onChange={handleChange}
                >
                  {/* <option selected disabled>
                      Lọc theo danh mục
                    </option> */}
                  <option value="">Tất cả</option>
                  {filterData(roomState)?.map((item) => (
                    <option value={item?.location?.district}>
                      {item?.location?.district}
                    </option>
                  ))}

                  {/* <option value="trang-phuc_bong-da">Phòng đơn</option> */}
                  {/* <option value="trang-phuc_bong-chuyen">Phòng đôi</option> */}
                </select>
              </form>
            </div>
            <div className="control-hotel">
              <div className="mt-3 control-hotel-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách khách sạn</h2>
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
                      <th scope="col">Giới hạn</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng phòng</th>
                      <th scope="col">Xem thêm</th>
                      {/* <th scope="col">Xóa</th> */}
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
                          <td>{item?.maximum_quantity}</td>
                          <td>{currencyFormat(item?.price)}</td>
                          <td>{item?.room_number?.length - 1}</td>
                          <td>
                            <button
                              onClick={() => getDetail(item?.id)}
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
                          </td>
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
                          <td>{item?.number_bed}</td>
                          <td>{item?.maximum_quantity}</td>
                          <td>{item?.price}</td>
                          <td>{/* <Star item={item?.start} /> */}</td>
                          {/* <td>
                            <button
                              type="button"
                              className="btn btn-secondary btn-xs"
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleEdit(item)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilSquare} /> Sửa
                              </span>
                            </button>
                          </td> */}

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

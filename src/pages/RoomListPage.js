import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Tooltip } from "react-bootstrap";
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

  console.log("roomState...", roomState);
  const roomList = useSelector((state) => state.roomReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
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
    // const handleClickDelete = (code) => {
    // setdeleteCode(code);
    setdeleteCode();
    setshowDel(true);
    // console.log("id...", id);
  };

  const handleDelete = async () => {
    // console.log("id: ", deleteId);
    try {
      await customAxios.post(`/admin/item/delete/${deleteCode}`);
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
    var searchList = [...roomState];
    searchList = searchList?.filter((item) => {
      return item?.room_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filterroom) {
      return roomState;
    }
    return roomState?.filter((item) => item?.hotel_id === filterroom);
  }

  var filterList = useMemo(getFilterList, [filterroom, roomState]);
  function handleChange(event) {
    setfilterroom(event.target.value);
  }

  const navigate = useNavigate();

  return (
    <div>
      {show === false ? (
        <div>
          {roomState?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
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
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
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
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      )}
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
              <Link className="btn-new" type="button" to="/addroom">
                THÊM PHÒNG
              </Link>
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
                  {/* {(roomState)?.map((item) => (
                      <option value={item?.categoryCode}>
                        {item?.categoryCode}
                      </option>
                    ))}
                       */}
                  <option value="trang-phuc_bong-da">Phòng đơn</option>
                  <option value="trang-phuc_bong-chuyen">Phòng đôi</option>
                </select>
              </form>
            </div>
            <div className="control-room">
              <div className="mt-3 control-room-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách các phòng</h2>
                  <div className="item-search">
                    <input
                      type="text"
                      className="item-search-input"
                      placeholder="Tìm kiếm theo tên/mã phòng"
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">Mã phòng</th>
                      <th scope="col">Tên phòng</th>
                      <th scope="col">Phân loại</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Chỉnh sửa</th>
                      <th scope="col">Xóa</th>
                      <th scope="col">Vô hiệu hóa</th>
                      <th scope="col">Kích hoạt</th>
                    </tr>
                  </thead>
                  {/* <tbody id="myTable">
                    <tr>

                      <td>P01</td>
                      <td onClick={() => goToDetail()}>Phòng Upper Deluxe</td>
                      <td>Phòng đơn</td>
                      <td>{currencyFormat(800000)}</td>
                      <td>5</td>
                      <td>
                        <span
                          className={{
                            dataToggle: Tooltip,
                            title: "Chỉnh sửa",
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} color="green" />
                        </span>
                       
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-xs"
                          data-toggle="modal"
                          data-target="#editModal"
                          variant="primary"
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
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-xs"
                          data-toggle="modal"
                          data-target="#delModal"
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

                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-xs"
                          data-toggle="modal"
                          data-target="#delModal"
                        >
                          <span
                            className={{
                              dataToggle: Tooltip,
                              title: "Xóa",
                            }}
                          >
                            Disable
                          </span>
                        </button>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          data-toggle="modal"
                          data-target="#delModal"
                        >
                          <span
                            className={{
                              dataToggle: Tooltip,
                              title: "Xóa",
                            }}
                          >
                            Active
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody> */}
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <button
                              // onClick={() => goToDetail(item.code)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} />
                              </span>
                            </button>
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
                                <FontAwesomeIcon icon={faPencilSquare} />
                              </span>
                            </button>
                            <button
                              // onClick={() => handleClickDelete(item?.code)}
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
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
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <button
                              // onClick={() => goToDetail(item.code)}
                              variant="primary"
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xem thêm",
                                }}
                              >
                                <FontAwesomeIcon icon={faStickyNote} />
                              </span>
                            </button>
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
                                <FontAwesomeIcon icon={faPencilSquare} />
                              </span>
                            </button>
                            <button
                              // onClick={() => handleClickDelete(item?.code)}
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
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

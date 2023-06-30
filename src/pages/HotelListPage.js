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
import { addListhotel } from "../redux/hotelSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
// import { Select } from "@mui/material";
import Select from "react-select";

export default function HotelListPage() {
  const [hotelState, sethotelState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(hotelState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterhotel, setfilterhotel] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActivehotel, setisActivehotel] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [imagehotelData1, setImagehotelData1] = useState();

  console.log("hotelState...", hotelState);
  const hotelList = useSelector((state) => state.hotelReducer);

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

  console.log("test", hotelState);

  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/edithotel/" + item?.code, {
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
    try {
      await customAxios.delete(`/hotel/${deleteCode}`);
      gethotelApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  // const goToDetail = (code) => {
  //   navigate("/hotelList/" + code);
  // };

  const goToDetail = () => {
    navigate("/hotelDetail");
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...hotelState];
    console.log("seacrh", searchList);

    searchList = searchList?.filter((item) => {
      return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
    console.log("seacrh", searchList);
  };
  function getFilterList() {
    if (!filterhotel) {
      return hotelState;
    }
    return hotelState?.filter((item) => item?.name === filterhotel);
  }

  var filterList = useMemo(getFilterList, [filterhotel, hotelState]);
  function handleChange(event) {
    setfilterhotel(event.target.value);
  }

  const navigate = useNavigate();

  return (
    <div>
      {show === false ? (
        <div>
          {hotelState?.map((item, index) => (
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
              <Link className="btn-new" type="button" to="/addhotel">
                THÊM KHÁCH SẠN
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
                  {/* {(hotelState)?.map((item) => (
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
                      <th scope="col">Tên khách sạn</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Quận/huyện</th>
                      <th scope="col">Thành phố</th>
                      <th scope="col">Sao</th>
                      <th scope="col">Chỉnh sửa</th>
                      <th scope="col">Xóa</th>
                    </tr>
                  </thead>
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          <td>{item?.id}</td>
                          <td>{item?.name}</td>
                          <td>{item?.location?.address}</td>
                          <td>{item?.location?.district}</td>
                          <td>{item?.location?.province}</td>
                          <td>{item?.start}</td>
                          {/* <td>
                            <button
                              onClick={() => goToDetail(item.code)}
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
                              onClick={() => handleClickDelete(item?.code)}
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
                          </td> */}
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
                      <div></div>
                    </tbody>
                  ) : (
                    ""
                  )}
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          <td>{item?.id}</td>
                          <td>{item?.name}</td>
                          <td>{item?.location?.address}</td>
                          <td>{item?.location?.district}</td>
                          <td>{item?.location?.province}</td>
                          <td>{item?.start}</td>
                          {/* <td>
                            <button
                              onClick={() => goToDetail(item.code)}
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
                              onClick={() => handleClickDelete(item?.code)}
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
                          </td> */}
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

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
  faStar,
  faStickyNote,
  faTimesCircle,
  faTrash,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListorder } from "../redux/orderSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
// import { Select } from "@mui/material";
import Select from "react-select";
import Star from "../components/Star";

export default function OrderPage() {
  const [orderState, setorderState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(orderState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterorder, setfilterorder] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActiveorder, setisActiveorder] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [imageorderData1, setImageorderData1] = useState();
  const [sortedOrders, setSortedOrders] = useState(orderState);

  console.log("orderState...", orderState);
  const orderList = useSelector((state) => state.orderReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getorderApi();
  }, []);
  const getorderApi = async () => {
    try {
      const res = await customAxios.get("/booking/list");
      dispatch(addListorder(res.data));
      setorderState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  console.log("test", orderState);

  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/editorder/" + item?.id, {
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
      await customAxios.delete(`/order/${deleteCode}`);
      getorderApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  // const goToDetail = (code) => {
  //   navigate("/orderList/" + code);
  // };

  const goToDetail = () => {
    navigate("/orderDetail");
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...orderState];
    console.log("seacrh", searchList);

    searchList = searchList?.filter((item) => {
      return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
    console.log("seacrh", searchList);
  };
  function getFilterList() {
    if (!filterorder) {
      return orderState;
    }
    return orderState?.filter((item) => item?.name === filterorder);
  }

  var filterList = useMemo(getFilterList, [filterorder, orderState]);
  function handleChange(event) {
    setfilterorder(event.target.value);
  }

  const navigate = useNavigate();
  const handleSort = () => {
    const sorted = [...sortedOrders].sort((a, b) => b.id - a.id);
    setSortedOrders(sorted);
  };

  return (
    <div>
      {show === false ? (
        <div>
          {orderState?.map((item, index) => (
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
              <div className="begin-item">
                <button className="btn-new" type="button">
                  Mới nhất
                </button>
              </div>
            </div>
            <div className="control-order">
              <div className="mt-3 control-order-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách đơn đặt</h2>
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
                      <th scope="col">Mã đơn hàng</th>
                      <th scope="col">Mã khách sạn</th>
                      <th scope="col">Tên phòng</th>
                      <th scope="col">Số phòng</th>
                      <th scope="col">Họ tên KH</th>
                      <th scope="col">SĐT</th>
                      <th scope="col">Ngày đến</th>
                      <th scope="col">Ngày đi</th>
                      <th scope="col">Tổng giá</th>
                      <th scope="col">Hủy</th>
                    </tr>
                  </thead>
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          <td>HĐ{item?.id}</td>
                          <td>{item?.hotel_id}</td>
                          <td>{item?.room_name}</td>
                          <td>{item?.room_number}</td>
                          <td>{item?.customer_name}</td>
                          <td>{item?.customer_phone}</td>
                          <td>{item?.start_date}</td>
                          <td>{item?.end_date}</td>
                          <td>{currencyFormat(item?.price)}</td>
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
                                <FontAwesomeIcon icon={faTrash} /> Hủy
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

import {
  faAddressBook,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faCaretDown,
  faCheckCircle,
  faCheckToSlot,
  faFileCirclePlus,
  faHome,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../config/api";
import { logout } from "../redux/userSlice";
import { addListBook } from "../redux/orderSlice";
import { currencyFormat } from "../ultils/constant";
import { url } from "../config/api";
import StatusBill from "../components/StatusBill";

export default function OrderDetail() {
  const params = useParams();
  const id = params.id;
  const [cancelId, setCancelId] = useState("");
  const [showDel, setshowDel] = useState(false);
  const [show, setShow] = useState(false);

  // console.log("id: ", id);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billbyId, setbillbyId] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    getBillByIdApi();
  }, []);
  const getBillByIdApi = async () => {
    try {
      const res = await customAxios.get(`/admin/bill?id=${id}`);
      setbillbyId(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  const handleConfirm = async (id) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   confirm: true,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${url}/admin/bill/confirm?id=${id}`, requestOptions)
    //   .then((response) => response.text())
    //   .then(
    //     (result) => alert("Xác nhận đơn hàng thành công"),
    //     navigate(`/deliveringBill`)
    //   )
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/confirm?id=${id}`);
      getBillByIdApi();
      alert("Duyệt đơn thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  const handleClickDelete = (id) => {
    setCancelId(id);
    setshowDel(true);
    console.log("id...", id);
  };
  const handleDelete = async () => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   status: false,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${url}/admin/bill/cancel?id=${cancelId}`, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => navigate(`/orderList`), alert("Huỷ đơn thành công"))
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/cancel?id=${cancelId}`);
      getBillByIdApi();
      navigate("/orderlist");
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  const handleClickSuccess = async (id) => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   delivered: true,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${url}/admin/bill/set-delivered?id=${id}`, requestOptions)
    //   .then((response) => response.text())
    //   .then(
    //     (result) => alert("Giao hàng thành công"),
    //     navigate("/successDeliver")
    //   )
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/set-delivered?id=${id}`);
      getBillByIdApi();
      alert("Giao hàng thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleClose = () => {
    setshowDel(false);
  };

  return (
    <div>
      {show === true ? (
        <div>
          {billbyId?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc chắn muốn hủy đơn?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa đơn vĩnh viễn, đơn chắc chắn sẽ không được
                giao.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(billbyId?.bill?.id)}
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
        ""
      )}
      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">Sport 9</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link"
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>

                <div
                  className="dropdown product nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveProduct(!isActiveProduct)}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {isActiveProduct && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/productList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Tất cả sản phẩm
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/addProduct"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {/* <FontAwesomeIcon icon={faHome} /> */}
                          Thêm sản phẩm
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="dropdown order nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveOrder(!isActiveOrder)}
                  >
                    <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  {!isActiveOrder && (
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <Link
                          className="nav-link active"
                          type="button"
                          to="/orderList"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Tất cả đơn hàng
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/successDeliver"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng thành công
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/deliveringBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng đang giao
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/confirmBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng chờ duyệt
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* <Link
                className="nav-link"
                type="button"
                to="/productList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý sản phẩm
              </Link>
              <Link
                className="nav-link"
                type="button"
                to="/bookList"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn hàng
              </Link> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
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

            {/* <div className="col-sm-10" style={{ padding: 0 }}> */}
            <div
              class="control-addReader container"
              style={{ marginRight: "20px" }}
            >
              <div class="mt-3 control-reader-table shadow-sm p-0 mb-5 bg-white rounded">
                <h4 class="ml-0 mt-0" style={{ textAlign: "center" }}>
                  Chi tiết đơn hàng
                </h4>
                <div class="row">
                  <div class="col-sm-1 position-left"></div>
                  <div class="col-sm-5 position-left">
                    <div className="form-group">
                      <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Tên người mua:
                          </th>
                          <td>{billbyId?.bill?.userInfo?.fullname}</td>
                        </tr>
                        {/* <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Mã sách:{" "}
                          </th>
                          <td>{billbyId?.codeBook}</td>
                        </tr> */}
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Tên đăng nhập:{" "}
                          </th>
                          <td>{billbyId?.bill?.userInfo?.username}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Số điện thoại:{" "}
                          </th>
                          <td>{billbyId?.bill?.userInfo?.phone}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Địa chỉ nhận hàng:{" "}
                          </th>
                          <td>{billbyId?.bill?.userInfo?.address}</td>
                        </tr>
                        {/* <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            ID sách hiện có:{" "}
                          </th>
                          <td>
                            {billState?.content?.map((item) => {
                              <a>{item.id}</a>;
                            })}
                          </td>
                        </tr> */}

                        {/* <tr>
                        <th>Số phát hành: </th>
                        <td>{billbyId?.issueBook}</td>
                      </tr> */}
                        {/* <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={"hello"}
                          viewBox={`0 0 256 256`}
                        /> */}
                      </Table>
                    </div>
                  </div>
                  <div class="col-sm-5 position-right">
                    <div className="form-group">
                      <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        style={{
                          width: "100%",
                        }}
                      >
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Tên sản phẩm:
                          </th>
                          <td>{billbyId?.billItems[0]?.item?.name}</td>
                        </tr>
                        {/* <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Mã sách:{" "}
                          </th>
                          <td>{billbyId?.codeBook}</td>
                        </tr> */}
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Phân loại:{" "}
                          </th>
                          <td>{billbyId?.billItems[0]?.item?.categoryCode}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Màu sắc:{" "}
                          </th>
                          <td>{billbyId?.billItems[0]?.item?.color}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Kích cỡ:{" "}
                          </th>
                          <td>{billbyId?.billItems[0]?.item?.size}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Số lượng:{" "}
                          </th>
                          <td>{billbyId?.billItems[0]?.quantity}</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            Thành tiền:{" "}
                          </th>
                          <td>{currencyFormat(billbyId?.bill?.totalPrice)}</td>
                        </tr>
                      </Table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3 position-left"></div>

                    <div class="col-sm-6 position-center">
                      <div className="form-group">
                        <Table
                          striped
                          bordered
                          hover
                          size="sm"
                          style={{
                            width: "100%",
                          }}
                        >
                          <tr>
                            <th
                              scope="row"
                              style={{ padding: "10px", width: "50%" }}
                            >
                              Trạng thái đơn hàng:
                            </th>
                            <td>
                              {billbyId?.bill?.delivered ? (
                                <StatusBill deli={billbyId?.bill?.delivered} />
                              ) : (
                                <StatusBill item={billbyId?.bill?.confirm} />
                              )}
                            </td>
                          </tr>

                          <tr>
                            <th
                              scope="row"
                              style={{ padding: "10px", width: "50%" }}
                            >
                              Xác nhận đơn hàng:{" "}
                            </th>
                            <td>
                              {billbyId?.bill?.confirm ? (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    checked
                                    disabled
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Xác nhận đơn hàng
                                  </label>
                                </div>
                              ) : (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onClick={() =>
                                      handleConfirm(billbyId?.bill?.id)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Xác nhận đơn hàng
                                  </label>
                                </div>
                              )}

                              {/* <button
                                type="button"
                                className="btn btn-primary btn-xs"
                                // data-toggle="modal"
                                // data-target="#editModal"
                                variant="primary"
                                onClick={() =>
                                  handleConfirm(billbyId?.bill?.id)
                                }
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Chỉnh sửa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheckCircle} /> Duyệt
                                  đơn hàng
                                </span>
                              </button> */}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ padding: "10px", width: "50%" }}
                            >
                              Hủy đơn hàng:{" "}
                            </th>
                            <td>
                              {billbyId?.bill?.delivered ? (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    disabled
                                    onClick={() =>
                                      handleClickDelete(billbyId?.bill?.id)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Hủy đơn hàng
                                  </label>
                                </div>
                              ) : (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onClick={() =>
                                      handleClickDelete(billbyId?.bill?.id)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Hủy đơn hàng
                                  </label>
                                </div>
                              )}
                              {/* <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  onClick={() =>
                                    handleClickDelete(billbyId?.bill?.id)
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  Hủy đơn hàng
                                </label>
                              </div> */}
                              {/* <button
                                onClick={() =>
                                  handleClickDelete(billbyId?.bill?.id)
                                }
                                type="button"
                                className="btn btn-secondary btn-xs"
                                // data-toggle="modal"
                                // data-target="#delModal"
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Xóa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Hủy đơn
                                  hàng
                                </span>
                              </button> */}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ padding: "10px", width: "50%" }}
                            >
                              Giao hàng thành công:{" "}
                            </th>
                            <td>
                              {billbyId?.bill?.delivered ? (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    checked
                                    disabled
                                    onClick={() =>
                                      handleClickSuccess(billbyId?.bill?.id)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Giao hàng thành công
                                  </label>
                                </div>
                              ) : (
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onClick={() =>
                                      handleClickSuccess(billbyId?.bill?.id)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Giao hàng thành công
                                  </label>
                                </div>
                              )}

                              {/* <button
                                onClick={() =>
                                  handleClickSuccess(billbyId?.bill?.id)
                                }
                                type="button"
                                className="btn btn-success btn-xs"
                                data-toggle="modal"
                                data-target="#delModal"
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Thành công",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheckToSlot} />
                                </span>
                              </button> */}
                            </td>
                          </tr>
                          {/* <tr>
                          <th
                            scope="row"
                            style={{ padding: "10px", width: "120px" }}
                          >
                            ID sách hiện có:{" "}
                          </th>
                          <td>
                            {billState?.content?.map((item) => {
                              <a>{item.id}</a>;
                            })}
                          </td>
                        </tr> */}

                          {/* <tr>
                        <th>Số phát hành: </th>
                        <td>{billbyId?.issueBook}</td>
                      </tr> */}
                          {/* <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={"hello"}
                          viewBox={`0 0 256 256`}
                        /> */}
                        </Table>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {/* <span style={{ display: "flex" }}>
                      Trạng thái đơn hàng:{" "}
                      <StatusBill deli={billbyId?.bill?.delivered} />
                    </span> */}
                    {/* <button
                      type="button"
                      className="btn btn-primary btn-xs"
                      data-toggle="modal"
                      data-target="#editModal"
                      variant="primary"
                      onClick={() => handleConfirm(billbyId?.bill?.id)}
                    >
                      <span
                        className={{
                          dataToggle: Tooltip,
                          title: "Chỉnh sửa",
                        }}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} /> Duyệt đơn hàng
                      </span>
                    </button>
                    <button
                      onClick={() => handleClickDelete(billbyId?.bill?.id)}
                      type="button"
                      className="btn btn-secondary btn-xs"
                      data-toggle="modal"
                      data-target="#delModal"
                    >
                      <span
                        className={{
                          dataToggle: Tooltip,
                          title: "Xóa",
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Hủy đơn hàng
                      </span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Button,
  button,
  Container,
  Modal,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArrowAltCircleUp,
  faBook,
  faBookBookmark,
  faBoxesPacking,
  faCaretDown,
  faCheck,
  faCheckCircle,
  faCheckToSlot,
  faDiagramSuccessor,
  faFileCirclePlus,
  faHome,
  faPencilSquare,
  faPlusCircle,
  faSave,
  faStickyNote,
  faTrash,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListBook } from "../redux/orderSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useRef } from "react";
import { height, style, width } from "@mui/system";
import { currencyFormat } from "../ultils/constant";
import StatusBill from "../components/StatusBill";
import { url } from "../config/api";

export default function OrderPage() {
  const [billState, setbillState] = useState(null);
  const [search, setSearch] = useState(billState);
  const [cancelId, setCancelId] = useState("");
  const [show, setShow] = useState(false);
  const [filterConfirm, setfilterConfirm] = useState();
  const [showDel, setshowDel] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [categorySearch, setCategorySearch] = useState();
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);

  const categorySearchRef = useRef(null);

  // console.log("billState...", billState);
  const bookList = useSelector((state) => state.bookReducer);

  const goToDetail = (id) => {
    navigate("/orderList/" + id);
  };
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getBillApi();
  }, []);
  const getBillApi = async () => {
    try {
      const res = await customAxios.get("/admin/bill/all");
      setbillState(res?.data);
    } catch (error) {
      console.log("Lỗi");
    }
  };

  console.log("bill...", billState);

  // const filterBook = async () => {
  //   // var myHeaders = new Headers();
  //   // myHeaders.append("Content-Type", "application/json");
  //   // var raw = JSON.stringify({
  //   //   auths: ["123afdsdf"],
  //   //   bookName: searchBookName,
  //   //   categorys: [],
  //   //   createDate: null,
  //   //   createUser: [],
  //   //   modifiedUser: [],
  //   //   modifyDate: null,
  //   //   price: null,
  //   //   publisher: [],
  //   // });
  //   // var requestOptions = {
  //   //   method: "POST",
  //   //   headers: myHeaders,
  //   //   body: raw,
  //   //   redirect: "follow",
  //   // };
  //   // fetch("http://172.31.99.192:9992/lbm/v1/book/info/search", requestOptions)
  //   //   .then((response) => {
  //   //     console.log("respon...", response);
  //   //   })
  //   //   .catch((error) => console.log("error", error));
  //   try {
  //     const data = {
  //       auths: ["123afdsdf"],
  //       bookName: "",
  //       categorys: [categorySearchRef?.current?.value],
  //       createDate: null,
  //       createUser: [],
  //       modifiedUser: [],
  //       modifyDate: null,
  //       price: null,
  //       publisher: [],
  //     };
  //     const res = await customAxios.post("/lbm/v1/book/info/search", data);
  //     console.log("res...", res);
  //     setBookData(res?.data?.content);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  // useEffect(() => {
  //   filterBook();
  // }, []);

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
    //     (result) => alert("Duyệt đơn thành công"),
    //     navigate("/deliveringBill")
    //   )
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/confirm?id=${id}`);
      getBillApi();
      alert("Duyệt đơn thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
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
      getBillApi();
      alert("Giao hàng thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleClickUndo = async (id) => {
    // var raw = "";

    // var requestOptions = {
    //   method: "POST",
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(`${url}/admin/bill/undo-delivered?id=${id}`, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => alert("Hoàn tác giao hàng"))
    //   .catch((error) => console.log("error", error));
    try {
      await customAxios.post(`/admin/bill/undo-delivered?id=${id}`);
      getBillApi();
      alert("Hoàn tác giao hàng thành công");
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  const handleClose = () => {
    setshowDel(false);
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
    //   .then((result) => navigate("/orderList"), alert("Đã hủy đơn thành công"))
    //   .catch((error) => console.log("error", error));
    // setshowDel(false);
    try {
      await customAxios.post(`/admin/bill/cancel?id=${cancelId}`);
      getBillApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...billState];
    // console.log("search billState", billState);
    searchList = searchList?.filter((item) => {
      return item.bookName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      // console.log("item", typeof item.bookName);
    });
    setSearch(searchList);
    setShow(true);
  };
  // console.log("bill", billState);
  let detailBill = billState?.map((item) => item?.bill?.confirm);
  function getFilterList() {
    if (!filterConfirm) {
      return billState;
    }
    return detailBill?.filter((item) => item === filterConfirm);
  }
  console.log("confirm", typeof filterConfirm);
  console.log("confirmBase", detailBill);
  let confirm = filterConfirm === "true";

  var filterList = useMemo(getFilterList, [confirm, detailBill]);
  function handleChange(event) {
    setfilterConfirm(event.target.value);
    // console.log("test...", event);
  }
  console.log("testFil,...", filterList);
  // var filterList = useMemo(getFilterList, [filterBorrow, billState?.content]);
  // async function handleChange(event) {
  //   // setfilterBorrow(event.target.value);
  //   try {
  //     const data = {
  //       auths: ["123afdsdf"],
  //       bookName: "",
  //       categorys: [categorySearchRef?.current?.value],
  //       createDate: null,
  //       createUser: [],
  //       modifiedUser: [],
  //       modifyDate: null,
  //       price: null,
  //       publisher: [],
  //     };
  //     const res = await customAxios.post("/lbm/v1/book/info/search", data);
  //     console.log("res...", res);
  //     setBookData(res?.data?.content);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // }

  // console.log("test", billState?.content);
  // console.log("testsearch..", search);
  // console.log("testfilter..", filterList);

  // const handleChangeSearchBookName = (e) => {
  //   console.log("e...", e.target.value);
  //   setSearchBookName(e.target.value);
  // };

  const nameBill = billState?.map((item) => {
    return item?.billItems;
  });

  console.log("nameBill...", nameBill);
  // console.log("name...", name);
  const navigate = useNavigate();
  return (
    <div>
      {show === true ? (
        <div>
          {search?.map((item, index) => (
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
                  onClick={() => handleDelete(item?.bill?.id)}
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
          {filterList?.map((item, index) => (
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
                  onClick={() => handleDelete(item?.bill?.id)}
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
        <div className="col-sm-2" style={{ padding: 0 }}>
          <div className="menu">
            <h4 className="menu-header">KMA Booking</h4>
            <div className="d-flex align-items-start">
              <div className="nav flex-column nav-pills">
                <Link
                  className="nav-link"
                  type="button"
                  to="/"
                  style={{ color: "white" }}
                >
                  <FontAwesomeIcon icon={faHome} /> Trang chủ
                </Link>

                <div
                  className="dropdown product nav-link"
                  style={{ color: "white" }}
                >
                  <div
                    className="dropdown-btn"
                    onClick={(e) => setisActiveProduct(!isActiveProduct)}
                  >
                    <FontAwesomeIcon icon={faFileCirclePlus} /> Quản lý phòng
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
                          Tất cả phòng
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
                          Thêm phòng
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
                    <FontAwesomeIcon icon={faBoxesPacking} /> Quản lý đơn đặt
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
                          Tất cả đơn đặt
                        </Link>
                      </div>
                      <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/successDeliver"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn đặt thành công
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
                      {/* <div className="dropdown-item">
                        <Link
                          className="nav-link"
                          type="button"
                          to="/confirmBill"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Đơn hàng hủy
                        </Link>
                      </div> */}
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

            <div className="control-reader">
              <div className="mt-3 control-reader-table shadow-sm p-3 mb-5 bg-white rounded">
                <h4
                  className="ml-0 mt-0"
                  style={{ color: "black", textAlign: "center" }}
                >
                  Thông tin đơn đặt
                </h4>

                <form className="form-inline w-100">
                  {/* <input
                    type="text"
                    className="book-search form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm theo tên sách"
                    name="search"
                    id="search"
                   
                    onChange={handleChangeSearch}
                  /> */}

                  {/* <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    onChange={handleChange}
                  >
                    
                    <option value="">Tất cả</option>
                    <option value="true">Đã xác nhận</option>
                    <option value="false">Chưa xác nhận</option>
                  </select>
                  <Link
                    className="btn btn-success mb-2 mr-3 mg-right"
                    type="button"
                    to="/addBook"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> Thêm
                  </Link> */}
                </form>

                <form className="form-inline w-100">
                  <input
                    type="text"
                    className="input-userCode form-control w-30 mb-2 mr-3"
                    placeholder="Tìm kiếm theo mã hóa đơn"
                    onChange={handleChangeSearch}
                  />
                  <select
                    className="browser-default custom-select w-30 mb-2 mr-3"
                    // value={filterStatus}
                    onChange={handleChange}
                  >
                    <option selected disabled>
                      Lọc theo trạng thái
                    </option>
                    <option value="">Tất cả</option>
                    {/* {filterData(productState)?.map((item) => (
                      <option value={item?.categoryCode}>
                        {item?.categoryCode}
                      </option>
                    ))}
                       */}
                    <option value="trang-phuc_bong-da">Đơn thành công</option>
                    <option value="trang-phuc_bong-chuyen">
                      Đơn chờ duyệt
                    </option>
                  </select>
                </form>

                <table className="table recently-violated">
                  <thead>
                    <tr>
                      <th scope="col">Mã đơn</th>
                      <th scope="col">Mã phòng</th>
                      <th scope="col">Họ tên KH</th>
                      <th scope="col">SĐT</th>
                      <th scope="col">Ngày đến</th>
                      <th scope="col">Ngày đi</th>
                      <th scope="col">Số phòng</th>
                      <th scope="col">Tổng giá</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>

                  <tbody id="myTable">
                    {/* {search?.map((item, index) => ( */}
                    <tr>
                      {/* <td>{item.id}</td> */}
                      <td>HĐ01</td>
                      <td>P02</td>
                      <td>Hương Giang</td>
                      <td>0974635473</td>
                      <td>2023-06-24</td>
                      <td>2023-06-26</td>
                      <td>1</td>
                      <td>{currencyFormat(1500000)}</td>
                      <td>
                        <button
                          // onClick={() => handleClickDelete(item?.code)}
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
                            Thành công
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody id="myTable">
                    {/* {search?.map((item, index) => ( */}
                    <tr>
                      {/* <td>{item.id}</td> */}
                      <td>HĐ02</td>
                      <td>P03</td>
                      <td>Đức Huy</td>
                      <td>0974985748</td>
                      <td>2023-06-23</td>
                      <td>2023-06-24</td>
                      <td>2</td>
                      <td>{currencyFormat(1400000)}</td>
                      <td>
                        <button
                          // onClick={() => handleClickDelete(item?.code)}
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
                            Thành công
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>

                  <tbody id="myTable">
                    {/* {search?.map((item, index) => ( */}
                    <tr>
                      {/* <td>{item.id}</td> */}
                      <td>HĐ03</td>
                      <td>P02</td>
                      <td>Hương Ly</td>
                      <td>0974635473</td>
                      <td>2023-06-22</td>
                      <td>2023-06-25</td>
                      <td>1</td>
                      <td>{currencyFormat(1500000)}</td>
                      <td>
                        <button
                          // onClick={() => handleClickDelete(item?.code)}
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
                            Chờ duyệt
                          </span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  {/* --------------------------------------------------- */}
                  {show === true ? (
                    <tbody id="myTable">
                      {search?.map((item, index) => (
                        <tr>
                          {/* <td>{item.id}</td> */}
                          <td>{item?.bill?.id}</td>
                          <td>{item.bookName}</td>
                          <td>{item.category}</td>
                          <td>{item.availableAmount}</td>
                          <td>{item.auth}</td>

                          <td>
                            <button
                              onClick={() => goToDetail(item.id)}
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#moreModal"
                              variant="primary"
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
                            {item?.bill?.delivered ? (
                              <button
                                onClick={() =>
                                  // handleClickDelete(item?.bill?.id)
                                  alert("Không thể hủy đơn đã giao thành công")
                                }
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
                            ) : (
                              <button
                                onClick={() =>
                                  handleClickDelete(item?.bill?.id)
                                }
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
                            )}

                            <button
                              onClick={() => handleClickDelete(item?.bill?.id)}
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
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          {/* <th scope="row"></th> */}
                          {/* <td>{item.id}</td> */}
                          <td>
                            {/* <button
                              type="button"
                              className="btn btn-primary btn-xs"
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleConfirm(item?.bill?.id)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </span>
                            </button> */}
                            {item?.bill?.confirm ? (
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
                                  Đã xác nhận
                                </label>
                              </div>
                            ) : (
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  onClick={() => handleConfirm(item?.bill?.id)}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  Xác nhận đơn
                                </label>
                              </div>
                            )}
                            {/* <button
                              onClick={() => handleClickDelete(item?.bill?.id)}
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
                                <FontAwesomeIcon icon={faTrash} />
                                
                              </span>
                            </button> */}
                            {/* {item?.bill?.delivered ? ( */}
                            {/* <button
                                disabled
                                onClick={() =>
                                  // handleClickDelete(item?.bill?.id)
                                  alert("Không thể hủy đơn đã giao thành công")
                                }
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
                              </button> */}
                            {item?.bill?.delivered ? (
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  disabled
                                  onClick={() =>
                                    handleClickDelete(item?.bill?.id)
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
                                    handleClickDelete(item?.bill?.id)
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
                            {/* ) : ( */}
                            {/* <button
                              onClick={() => handleClickDelete(item?.bill?.id)}
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
                            </button> */}
                            {/* ) */}
                          </td>
                          <td>{item?.bill?.userInfo?.username}</td>
                          <td
                            onClick={() => goToDetail(item?.bill?.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {/* <p
                              style={{
                                paddingRight: "5px",
                              }}
                            >
                              <img
                                src={item?.billItems[0]?.item?.image[0]}
                                width={40}
                                height={40}
                              ></img>
                            </p> */}
                            <p
                              style={{
                                paddingRight: "5px",
                                fontWeight: "500",
                              }}
                            >
                              {item?.billItems[0]?.item?.name}
                            </p>
                            <p>x {item?.billItems[0]?.quantity}</p>
                          </td>
                          {/* <td>{item.bookName}</td> */}
                          <td>{currencyFormat(item?.billItems[0]?.price)}</td>
                          <td>
                            <StatusBill item={item?.bill?.confirm} />
                          </td>
                          <td>
                            <StatusBill deli={item?.bill?.delivered} />
                          </td>
                          <td>
                            {item?.bill?.delivered ? (
                              <div>
                                <button
                                  onClick={() =>
                                    handleClickUndo(item?.bill?.id)
                                  }
                                  type="button"
                                  className="btn btn-secondary btn-xs"
                                  data-toggle="modal"
                                  data-target="#delModal"
                                >
                                  <span
                                    className={{
                                      dataToggle: Tooltip,
                                      title: "Hoàn tác ",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faUndo} />
                                    {/* Hủy */}
                                  </span>
                                </button>
                              </div>
                            ) : (
                              <div>
                                {item?.bill?.confirm ? (
                                  <button
                                    onClick={() =>
                                      handleClickSuccess(item?.bill?.id)
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
                                      {/* Hủy */}
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      alert("Đơn hàng chưa được xác nhận!")
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
                                      {/* Hủy */}
                                    </span>
                                  </button>
                                )}
                              </div>
                            )}
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

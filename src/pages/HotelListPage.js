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
  faStar,
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
import Star from "../components/Star";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  ModalTitle,
} from "reactstrap";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useRef } from "react";
import FileResizer from "react-image-file-resizer";

export default function HotelListPage() {
  const [hotelState, sethotelState] = useState(null);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState(hotelState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterhotel, setfilterhotel] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActivehotel, setisActivehotel] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [imagehotelData1, setImagehotelData1] = useState();
  const [modal, setmodal] = useState(false);
  // console.log("hotelState...", hotelState);
  const hotelList = useSelector((state) => state.hotelReducer);
  const [detail, setDetail] = useState([]);
  const hotel_idRef = useRef(null);
  const hotel_nameRef = useRef(null);
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const houseRef = useRef(null);
  const hotel_descriptionRef = useRef(null);
  const [base64Image, setBase64Image] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    gethotelApi();
  }, []);
  const gethotelApi = async () => {
    try {
      const res = await customAxios.get("/hotel/list");
      dispatch(addListhotel(res.data));
      sethotelState(res?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async (id) => {
    try {
      const detailData = await customAxios.get(`/hotel?id=${id}`);
      setDetail(detailData?.data);
    } catch (error) {}
    setShowDetail(true);
  };

  console.log("hotelState..", hotelState);

  const handleEdit = (item) => {
    console.log("item...", item);
    navigate("/edithotel/" + item?.id, {
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
      await customAxios.delete(`/hotel?id=${deleteCode}`);
      gethotelApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };
  const goToDetail = (code) => {
    navigate("/hotelList/" + code);
    setShowDetail(true);
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
    return hotelState?.filter(
      (item) => item?.location?.province === filterhotel
    );
  }

  var filterList = useMemo(getFilterList, [filterhotel, hotelState]);
  function handleChange(event) {
    setfilterhotel(event.target.value);
  }
  console.log("fil........", filterhotel);

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
  // });

  // console.log("slideimage...", detail?.images);

  const [files, setFile] = useState();

  // const fileNames = [];
  // for (let i = 0; i < files?.length; i++) {
  //   const file = files[i];
  //   const fileName = file.name;
  //   console.log("filename...", fileName); // Lấy tên tệp tin
  // }
  const fileNames = [];
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

  // const fileNames = [];
  // for (let i = 0; i < files?.length; i++) {
  //   const file = files[i];
  //   const fileName = file.name;
  //   console.log("filename...", fileName); // Lấy tên tệp tin
  // }

  console.log("img...", files);

  const outputImg = base64Images.map((item) => item.split(",")[1]);

  const handleSubmit = (e) => {
    e.preventDefault(); //chặn trước khi action đẩy dữ liệu lên thanh url

    // for (let i = 0; i < files?.length; i++) {
    //   // const file = files[i];
    //   // const fileName = file.name;
    //   // fileNames.push(fileName);
    //   FileResizer.imageFileResizer(
    //     files[i],
    //     800, // chiều rộng mới
    //     800, // chiều cao mới
    //     "JPEG", // định dạng đầu ra
    //     100, // chất lượng
    //     0, // góc quay (0 là không quay)
    //     (base64Image) => {
    //       setBase64Images(base64Image);
    //     },
    //     "base64" // đầu ra là chuỗi base64
    //   );

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: hotel_idRef.current.value,
      name: hotel_nameRef.current.value,
      location: {
        province: provinceRef.current.value,
        district: districtRef.current.value,
        address: houseRef.current.value,
      },
      description: hotel_descriptionRef.current.value,

      images: outputImg,
    });
    // }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/hotel", requestOptions)
      .then((response) => response.text())
      // .then((result) => console.log("success"))
      .then((result) => window.location.reload())
      .catch((error) => console.log("error", error));
  };
  console.log("base64...", base64Images);

  const provinceList = hotelState?.map((item) => {
    return item?.location?.province;
  });
  const uniqueArr = Array.from(new Set(provinceList));
  console.log("provinceList", uniqueArr);

  return (
    <div>
      {show === false ? (
        <div>
          {hotelState?.map((item, index) => (
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
                        {detail?.images?.map((slideImage, index) => (
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
          <ModalHeader toggle={() => setmodal(!modal)}>
            THÊM KHÁCH SẠN
          </ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col lg={12}>
                  <label>Mã khách sạn</label>
                  <input
                    ref={hotel_idRef}
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Tên khách sạn</label>
                  <input
                    ref={hotel_nameRef}
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Địa chỉ</label>
                  <Row>
                    <Col lg={4}>
                      <input
                        ref={houseRef}
                        type="text"
                        className="form-control"
                        placeholder="Số nhà"
                      />
                    </Col>
                    <Col lg={4}>
                      <input
                        ref={districtRef}
                        type="text"
                        className="form-control"
                        placeholder="Quận/ Huyện"
                      />
                    </Col>
                    <Col lg={4}>
                      <input
                        ref={provinceRef}
                        type="text"
                        className="form-control"
                        placeholder="Tỉnh/ Thành phố"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={12}>
                  <label>Mô tả</label>
                  <input
                    ref={hotel_descriptionRef}
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Hình ảnh: </label>
                  <br />
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg"
                    onChange={handleChangeFile}
                  />
                  {/* {base64Image && (
                    <img
                      src={`data:image/jpeg;base64,${base64Image}`}
                      alt="Uploaded"
                    />
                  )} */}

                  {/* <UploadButton
                    uploader={uploader}
                    options={{ multi: true }}
                    onComplete={(files) => console.log(files)}
                  >
                    {({ onClick }) => (
                      <button onClick={onClick}>Upload a file...</button>
                    )}
                  </UploadButton> */}
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
                onClick={() => setmodal(true)}
              >
                THÊM KHÁCH SẠN
              </button>
              <form className="form-inline w-50">
                <select
                  className="browser-default custom-select mb-2 mr-3"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Lọc theo Thành phố
                  </option>
                  <option value="">Tất cả</option>
                  {uniqueArr?.map((item) => (
                    <option value={item}>{item}</option>
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
                      <th scope="col">Tên khách sạn</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Quận/huyện</th>
                      <th scope="col">Thành phố</th>
                      <th scope="col">Đánh giá</th>
                      {/* <th scope="col">Xem thêm</th> */}
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
                          <td>
                            <Star item={item?.start} />
                          </td>
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
                          <td>
                            <Star item={item?.start} />
                          </td>
                          {/* <td>
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

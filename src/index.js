import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import EditProductPage from "./pages/EditRoomPage";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import ProtectRouter from "./components/ProtectRouter";
import RoomListPage from "./pages/RoomListPage";
import AddRoomPage from "./pages/AddRoomPage";
import EditRoomPage from "./pages/EditRoomPage";
import HotelListPage from "./pages/HotelListPage";
import EditHotelPage from "./pages/EditHotelPage";
import AddHotelPage from "./pages/AddHotelPage";
import OrderPage from "./pages/orderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <HomePage />,
      </ProtectRouter>
    ),
  },
  {
    path: "/addRoom",
    element: (
      <ProtectRouter>
        <AddRoomPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/addHotel",
    element: (
      <ProtectRouter>
        <AddHotelPage />
      </ProtectRouter>
    ),
  },

  {
    path: "/editRoom/:code",
    element: (
      <ProtectRouter>
        <EditRoomPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/editHotel/:code",
    element: (
      <ProtectRouter>
        <EditHotelPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/roomList",
    element: (
      <ProtectRouter>
        <RoomListPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/hotelList",
    element: (
      <ProtectRouter>
        <HotelListPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/order",
    element: (
      <ProtectRouter>
        <OrderPage />
      </ProtectRouter>
    ),
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* // <Provider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

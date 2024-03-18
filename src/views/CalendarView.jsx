import { useEffect, useState } from "react";
import { useAxiosWithToken } from "../config/axios-config.js";
import { checkLogin } from "../utils/checkLogin.js";
import { useSelector } from "react-redux";
import Calendar from "../components/Calendar.jsx";
import Header from "../layouts/Header.jsx";
import CardRoom from "../components/CardRoom.jsx";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Alert from "../components/Alert.jsx";
import BookingModal from "../components/BookingModal.jsx";

dayjs.extend(utc);
dayjs.extend(timezone);

const CalendarView = () => {
  checkLogin();

  const requestWithToken = useAxiosWithToken();
  const auth = useSelector((state) => state.token.decode);

  // useState ##################################################################################

  const [selectedRoomData, setSelectedRoomData] = useState({});
  const [listRooms, setListRooms] = useState([]);
  const [listBookings, setListBookings] = useState([]);
  const [listDisabledDates, setListDisabledDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const [alert, setAlert] = useState({});

  const [formData, setFormData] = useState({
    firstName: auth?.firstName || "",
    lastName: auth?.lastName || "",
    email: auth?.email || "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [dateBetween, setDateBetween] = useState({
    startDate: null,
    endDate: null,
  });

  // useEffect ##################################################################################

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestWithToken.get("/room");
        if (response.status === 200) {
          setListRooms(response.data.data);
        }
      } catch (error) {
        console.log("error get room");
      }
    };

    fetchData();
    setFormData({
      firstName: auth?.firstName || "",
      lastName: auth?.lastName || "",
      email: auth?.email || "",
      phone: "",
    });
  }, [auth]);

  useEffect(() => {
    handleSelectedRoom(selectedRoomData);
  }, [isRefresh, selectedRoomData]);

  useEffect(() => {
    setIsSelectedRoom(Object.keys(selectedRoomData).length === 0);
  }, [selectedRoomData]);

  useEffect(() => {
    const formattedBookings = listBookings.map((booking) => {
      const checkInDate = dayjs(booking.checkIn).utc();
      const checkOutDate = dayjs(booking.checkOut).utc();
      const checkInDateUTC7 = checkInDate.utcOffset(7);
      const checkOutDateUTC7 = checkOutDate.utcOffset(7);
      const startDate = checkInDateUTC7.format("YYYY-MM-DD");
      const endDate = checkOutDateUTC7.format("YYYY-MM-DD");

      return {
        startDate,
        endDate,
      };
    });
    setListDisabledDates(formattedBookings);
  }, [listBookings]);

  // function ##################################################################################

  const handleAlertClose = () => setAlert({ show: false });

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDateBetweenChange = (newDate) => {
    setDateBetween(newDate);
    console.log("newDate", newDate);
  };

  const onCloseModal = () => {
    handleDateBetweenChange({
      startDate: null,
      endDate: null,
    });
    handleFormReset();
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value
        ? ""
        : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
    }));
  };

  const handleFormReset = () => {
    setFormData({
      firstName: auth?.firstName || "",
      lastName: auth?.lastName || "",
      email: auth?.email || "",
      phone: "",
    });
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setDateBetween({
      startDate: null,
      endDate: null,
    });
  };

  const handleSelectedRoom = async (roomData) => {
    setSelectedRoomData(roomData);
    try {
      const response = await requestWithToken.get(`/booking/${roomData._id}`);
      if (response.status === 200) {
        setListBookings(response.data.bookings);
      }
    } catch (error) {
      setListBookings([]);
      console.log("Get booking by room id error!");
    }
  };

  const handleSelectDate = (day, month, year) => {
    onToggleModal();
    handleDateBetweenChange({
      startDate: `${year}-${month + 1}-${day}`,
      endDate: `${year}-${month + 1}-${day}`,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setAlert({ show: false });

    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );
    const errorFields = Object.keys(formErrors).filter(
      (key) => formErrors[key] !== ""
    );

    const isValidEmail = () => {
      // Regular expression
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email);
    };

    const data = {
      email: formData.email || auth?.email,
      firstName: formData.firstName || auth?.firstName,
      lastName: formData.lastName || auth?.lastName,
      phone: formData.phone,
      user: auth.id,
      room: selectedRoomData._id,
      checkIn: dateBetween.startDate,
      checkOut: dateBetween.endDate,
    };

    if (emptyFields.length > 0) {
      const newFormErrors = {};
      emptyFields.forEach((field) => {
        newFormErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...newFormErrors,
      }));
    } else if (
      errorFields.length === 0 &&
      dateBetween.startDate &&
      isValidEmail()
    ) {
      try {
        const response = await requestWithToken.post("/booking", { ...data });
        if (response.status === 201) {
          setIsRefresh(!isRefresh);
          onCloseModal();
          setAlert({
            show: true,
            title: "Booking Success!",
            delay: 5000,
            type: "success",
          });
          handleFormReset();
        }
      } catch (error) {
        setAlert({
          show: true,
          title: "Booking Error!",
          delay: 5000,
          type: "error",
        });
        console.log("Booking error!");
      }
    }
  };

  return (
    <div>
      <Header />
      {alert?.show && (
        <Alert
          title={alert?.title}
          detail={alert?.detail}
          delay={alert?.delay}
          type={alert?.type}
          onClose={handleAlertClose}
        />
      )}

      <div className="py-4 px-8 mt-14 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-y-4">
          <div
            className="md:col-span-1 md:pr-3 space-y-2 snap-y snap-mandatory overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 12rem)" }}
          >
            {listRooms.map((room, index) => (
              <div key={index} className="snap-always snap-center px-3 py-1">
                <CardRoom
                  roomData={room}
                  onClickRoom={handleSelectedRoom}
                  idSelect={selectedRoomData?._id}
                />
              </div>
            ))}
          </div>
          <div className={`md:col-span-2 md:ml-4 relative space-y-2 `}>
            <div className="bg-white rounded-md px-8 py-4 shadow-md ">
              <p className="text-xl md:pl-8  text-2xl  font-medium">
                {selectedRoomData?.roomNumber
                  ? `${selectedRoomData?.roomNumber}`
                  : "Please select a room"}
              </p>
            </div>
            <Calendar
              onClickDate={isSelectedRoom ? () => {} : handleSelectDate}
              isBlur={isSelectedRoom}
              disabledDates={listDisabledDates}
            />
            {isSelectedRoom && (
              <div className="absolute inset-0 flex justify-center items-center">
                <p className="motion-safe:animate-bounce bg-white rounded-full px-16 py-4 shadow-xl text-2xl text-slate-600 font-medium">
                  Please select a room
                </p>
              </div>
            )}
          </div>
        </div>
        <BookingModal
          isOpen={!isSelectedRoom && isModalOpen}
          onClose={onCloseModal}
          onOk={(e) => handleFormSubmit(e)}
          selectedRoomData={selectedRoomData}
          dateBetween={dateBetween}
          disabledDates={listDisabledDates}
          formData={formData}
          formErrors={formErrors}
          handleChange={handleChange}
          handleDateBetweenChange={handleDateBetweenChange}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default CalendarView;

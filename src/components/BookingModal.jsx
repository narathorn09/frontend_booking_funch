import React from "react";
import PropTypes from "prop-types";
import Modal from "../components/Modal.jsx";
import TextInput from "../components/TextInput.jsx";
import Datepicker from "react-tailwindcss-datepicker";
import { MapPinIcon } from "@heroicons/react/24/outline";

const BookingModal = ({
  isOpen,
  onClose,
  onOk,
  selectedRoomData,
  dateBetween,
  disabledDates,
  formData,
  formErrors,
  handleChange,
  handleDateBetweenChange,
  handleFormSubmit,
}) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);

  const listDateDisabled = [
    ...disabledDates,
    { startDate: "2011-01-01", endDate: currentDate },
  ];

  return (
    <Modal
      title="BOOKING"
      textOk="Book"
      textCancel="cancel"
      onToggle={() => {}}
      onClose={onClose}
      onOk={onOk}
      isOpen={isOpen}
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <div className="mb-5 flex flex-row justify-between ">
          <div>
            <div className="font-semibold text-xl mb-2">
              {selectedRoomData.roomNumber}
            </div>
            <div className="-ml-1 text-gray-700 text-base flex items-center">
              <MapPinIcon className="size-5  mr-2" />
              <p>{selectedRoomData.location}</p>
            </div>
            <p className="text-gray-700 text-base">{selectedRoomData.detail}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-gray-700 text-base flex items-center">
              <span className="text-3xl font-bold mr-1">
                ฿{selectedRoomData.pricePerNight}
              </span>
              / night
            </p>
          </div>
        </div>

        <div key="calendarSelect" className="flex flex-col mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="text-red-500 mr-1">*</span>Check In - Check Out
          </label>
          <Datepicker
            primaryColor={"indigo"}
            startFrom={
              dateBetween.startDate
                ? new Date(dateBetween.startDate)
                : new Date()
            }
            useRange={false}
            disabledDates={listDateDisabled}
            value={dateBetween}
            onChange={handleDateBetweenChange}
            displayFormat={"DD/MM/YYYY"}
            popoverDirection="down"
            readOnly={true}
            // showFooter={true}
            inputClassName={`mb-1 p-2 w-full border border-gray-300 rounded-md outline-indigo-300 ${
              dateBetween.startDate === null
                ? "border-red-500 focus:outline-red-400"
                : ""
            } `}
          />
          <p
            className={`text-red-500 text-xs font-medium h-1 -mt-1 ${
              dateBetween.startDate === null ? "visible" : "invisible"
            } `}
          >
            Please select date.
          </p>
        </div>
        <div className="md:flex mt-1">
          <div className="md:w-1/2 md:mr-2">
            <TextInput
              type="text"
              name="firstName"
              label="First name"
              value={formData.firstName}
              error={formErrors.firstName}
              onChange={handleChange}
              placeholder=""
              required={true}
              maxLength={50}
            />
          </div>
          <div className="md:w-1/2 md:ml-2">
            <TextInput
              type="text"
              name="lastName"
              label="Last name"
              value={formData.lastName}
              error={formErrors.lastName}
              onChange={handleChange}
              placeholder=""
              required={true}
              maxLength={50}
            />
          </div>
        </div>
        <TextInput
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          error={formErrors.email}
          onChange={handleChange}
          placeholder=""
          required={true}
          maxLength={200}
        />
        <TextInput
          type="text"
          name="phone"
          label="Phone"
          value={formData.phone}
          error={formErrors.phone}
          onChange={handleChange}
          placeholder=""
          required={true}
          maxLength={10}
        />
      </form>
    </Modal>
  );
};

BookingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  selectedRoomData: PropTypes.object.isRequired,
  dateBetween: PropTypes.object.isRequired,
  disabledDates: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateBetweenChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

export default BookingModal;

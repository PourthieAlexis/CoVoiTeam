import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { CalendarDaysIcon, UserIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "../assets/styles/components/input.css";
registerLocale("fr", fr);
import { Formik, Field, Form, ErrorMessage } from "formik";
import TripInitialValues from "../formik/initialValues/TripInitialValues";
import { schemaSearchbarTrip } from "../formik/yup/TripYup";

function Searchbar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSubmit = (values) => {
    console.log("Values", values);
  };

  return (
    <div className="searchbar-container w-full relative">
      <div className="searchbar-content">
        <Formik
          initialValues={TripInitialValues}
          validationSchema={schemaSearchbarTrip}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-row flex-wrap lg:flex-nowrap border-black bg-white rounded-lg">
              <div className="searchbar-input" dir="ltr">
                <Field
                  type="text"
                  name="startingPoint"
                  placeholder="Départ"
                  className="searchbar-input-departure"
                />
                <ErrorMessage
                  name="startingPoint"
                  component="div"
                  className="text-red-500 absolute ml-2"
                />
              </div>
              <div className="searchbar-input ending-point-container">
                <Field
                  type="text"
                  name="endingPoint"
                  className="searchbar-input-destination"
                  placeholder="Destination"
                />
                <ErrorMessage
                  name="endingPoint"
                  component="div"
                  className="text-red-500 absolute ml-2"
                />
              </div>
              <div className="datepicker-container">
                <CalendarDaysIcon className="h-5 w-5 md:h-7 md:w-7 xl:h-10 xl:w-10 text-primary ml-4" />
                <DatePicker
                  locale={"fr"}
                  selected={selectedDate}
                  onChange={(date) => {
                    setFieldValue("selectedDate", date);
                    setSelectedDate(date);
                  }}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  className="placeholder:text-black border-none w-28 focus:border-black focus:ring-0 xl:w-4/5 text-center"
                />
                <ErrorMessage
                  name="selectedDate"
                  component="div"
                  className="text-red-500 absolute mt-16 ml-2"
                />
              </div>
              <div className="seats-container">
                <UserIcon className="h-5 md:h-8 lg:h-10 w-1/2 text-primary" />
                <Field
                  as="select"
                  name="seats"
                  className="w-1/2 bg-none border-0 text-center pr-4 focus:border-black focus:ring-0"
                >
                  <option value="1" className="searchbar-font">
                    1
                  </option>
                  <option value="2" className="searchbar-font">
                    2
                  </option>
                  <option value="3" className="searchbar-font">
                    3
                  </option>
                  <option value="4" className="searchbar-font">
                    4
                  </option>
                </Field>
              </div>
              <div className="searchbar-btn-submit" dir="rtl">
                <button
                  type="submit"
                  className="w-full rounded-b-sm lg:rounded-none lg:rounded-r-lg  bg-primary text-white h-full p-2 searchbar-font"
                >
                  Rechercher
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Searchbar;

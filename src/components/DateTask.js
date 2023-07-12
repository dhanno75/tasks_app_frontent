import { Chip } from "@mui/material";
import React from "react";

const DateTask = ({ dateNow }) => {
  const handleDelete = function () {
    console.log("This delete button");
  };
  let dates = (new Date(dateNow) + "").split(" ");

  // const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // const dayToday = new Date().getDay();
  // console.log(new Date().getDay());
  // console.log(new Date().toTimeString());

  // let day = weekday.find((val, i) => dayToday === i);
  // console.log(day);
  return (
    <Chip
      label={`${dates[0]}, ${dates[1]} ${dates[2]}`}
      color="primary"
      className="date-chip"
      variant="outlined"
      size="small"
      defaultValue={null}
      // onDelete={handleDelete}
      sx={{
        padding: "4px 0",
        border: "none",
        backgroundColor: "#e9e9e9",
        paddingRight: "0",
        fontFamily: "Raleway",
        fontWeight: "700",
        color: "#0472d8",
      }}
    />
  );
};

export default DateTask;

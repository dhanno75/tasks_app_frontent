import React, { useRef } from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
import {
  HiCalendarDays,
  HiOutlineTag,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Popover } from "antd";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Chip from "@mui/material/Chip";
import { FaPaintBrush, FaRegTrashAlt } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { ListContainer, Pop } from "./styled_components/listCard";

const Task = ({ titleName }) => {
  const taskNameRef = useRef();
  const taskDetailsRef = useRef();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const content = (
    <Pop>
      <ul>
        <li>
          <HiPencil /> <span> Rename list</span>
        </li>
        <li>
          <FaPaintBrush /> <span> Set color</span>
        </li>
        <li>
          <HiTrash />
          <span> Delete list</span>
        </li>
      </ul>
    </Pop>
  );

  const calendar = (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );

  const taskContent = (
    <Pop>
      <ul>
        <li>
          <HiPencil /> <span> Edit</span>
        </li>
        <li>
          <HiTrash />
          <span> Delete</span>
        </li>
      </ul>
    </Pop>
  );

  const label = (
    <Pop>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Priority</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="priority"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="low">low</MenuItem>
          <MenuItem value="high">high</MenuItem>
          <MenuItem value="critical">critical</MenuItem>
        </Select>
      </FormControl>
    </Pop>
  );

  return (
    <ListContainer>
      <Paper
        sx={{
          padding: "12px",
          margin: "auto",
          height: "auto",
        }}
      >
        <div className="paper-header">
          <p>{titleName ? titleName : "My Tasks"}</p>
          <Popover content={content} trigger="click" className="pops">
            <TbDotsVertical style={{ cursor: "pointer" }} />
          </Popover>
        </div>
        <div className="addTask">
          <TbPlus size={19} />
          <span>Add a task</span>
        </div>
        <div className="taskDetails-wrapper">
          <div className="taskDetails">
            <div className="check">
              <MuiCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleOutlineIcon />}
                className="checkbox"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
              />
            </div>
            <div className="taskDetails-container">
              <div className="taskName">
                <textarea
                  name=""
                  placeholder="Title"
                  className="taskTitle"
                  autoFocus
                  ref={taskNameRef}
                  style={{
                    placeholder: "Details",
                    resize: "none",
                    height: "22px",
                    minHeight: "22px",
                    maxHeight: "132px",
                    overflowY: "hidden",
                  }}
                ></textarea>
                <textarea
                  name=""
                  placeholder="Details"
                  className="taskDetail"
                  ref={taskDetailsRef}
                  style={{
                    placeholder: "Details",
                    resize: "none",
                    height: "16px",
                    minHeight: "16px",
                    maxHeight: "9.0072e+15px",
                    overflowY: "hidden",
                  }}
                ></textarea>
              </div>
              <div className="date">
                <Chip
                  label="primary"
                  color="primary"
                  className="date-chip"
                  variant="outlined"
                  size="small"
                  onDelete={handleDelete}
                />
              </div>
              <div className="attachments">
                <Popover content={calendar} trigger="click">
                  <Tooltip title="Add date" arrow>
                    <div>
                      <HiCalendarDays />
                    </div>
                  </Tooltip>
                </Popover>
                <Popover content={label} trigger="click">
                  <Tooltip title="Add priority" arrow>
                    <div>
                      <HiOutlineTag />
                    </div>
                  </Tooltip>
                </Popover>
              </div>
            </div>
            <Popover content={taskContent} trigger="click">
              <TbDotsVertical
                style={{ cursor: "pointer" }}
                className="dotsVertical"
              />
            </Popover>
          </div>
        </div>
        <div className="complete">
          <Accordion sx={{ boxShadow: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontFamily: "Raleway",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#777777",
                }}
              >
                Completed
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "8px" }}>
              <div className="complete-details">
                <div className="complete-icons">
                  <IoCheckmarkSharp />
                </div>
                <p>hello</p>
                <div className="complete-icons">
                  <FaRegTrashAlt className="trash" />
                </div>
              </div>
            </AccordionDetails>
            <AccordionDetails sx={{ padding: "8px" }}>
              <div className="complete-details">
                <div className="complete-icons">
                  <IoCheckmarkSharp />
                </div>
                <p>hello</p>
                <div className="complete-icons">
                  <FaRegTrashAlt className="trash" />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>
    </ListContainer>
  );
};

// const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const dayToday = new Date().getDay();
// console.log(new Date().getDay());
// console.log(new Date().toTimeString());

// let day = weekday.find((val, i) => dayToday === i);
// console.log(day);

export default Task;

import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiCheckbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TbDotsVertical, TbPlus } from "react-icons/tb";
// import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getLists } from "../redux/features/ListSlice";
import { getTasks } from "../redux/features/TaskSlice";
import { DashboardContainer } from "./styled_components/dashboardContainer";
import { Pop, ListContainer } from "./styled_components/listCard";
import {
  HiCalendarDays,
  HiOutlineTag,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { FaPaintBrush, FaRegTrashAlt } from "react-icons/fa";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { IoCheckmarkSharp } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Popover } from "antd";
import { Tag } from "antd";
import DateTask from "./DateTask";
import { API } from "../globals";

const Dashboard = () => {
  // let date = new Date(Date.now()).toISOString().split("-");
  // let todaysDate = `${date[0]}-${date[1]}-${date[2][0]}${date[2][1]}`;
  const [addList, setAddList] = useState(false);
  const [addTask, setAddTask] = useState("");
  const [titleName, setTitleName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [priority, setPriority] = useState("");

  const [tname, setTName] = useState("");
  const [tdname, setTDName] = useState("");

  // console.log(tname, tdname, dateValue, priority);
  // console.log(dateValue.$d);
  // console.log(typeof (dateValue.$d + ""));

  const dateNow = (Object.values(dateValue)[2] + "").split(" ");
  // const dateToDb = new Date(Object.values(dateValue)[2]).toISOString();

  const listRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { lists } = useSelector((state) => state.list);
  const { tasks } = useSelector((state) => state.task);

  const listTasks = function () {
    lists.forEach((list) => {
      dispatch(getTasks({ listId: list._id }));
    });
  };

  // const res = lists.map(list => return)

  useEffect(() => {
    dispatch(getLists({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    listTasks();
  }, [lists]);

  const listSubmit = async (e) => {
    e.preventDefault();
    const name = listRef.current.value;
    setTitleName(name);
    setAddTask(true);
    setAddList(false);
  };

  const taskSubmit = async (e) => {
    e.preventDefault();
    let dateForm;
    if (dateValue !== "" || dateValue !== null || dateValue !== undefined) {
      dateForm = new Date(Object.values(dateValue)[2]).toISOString();
    }
    const values = {
      listId: addTask,
      vals: {
        taskName: tname,
        text: tdname,
        date: dateForm,
        priority:
          priority === "success"
            ? "low"
            : priority === "warning"
            ? "high"
            : priority === "error"
            ? "critical"
            : "",
      },
    };
    // dispatch(addTasks(values));
    const token = localStorage.getItem("token");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        token,
      },
    };

    await fetch(`${API}/lists/${values.listId}/tasks`, {
      method: "POST",
      body: JSON.stringify(values.vals),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    // await axios.post(
    //   `${API}/lists/${values.listId}/tasks`,
    //   config,
    //   values.vals
    // );
    console.log(tname, tdname, dateForm, priority);
  };

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
          <DatePicker
            onChange={(newValue) => setDateValue(newValue)}
            value={dateValue}
          />
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
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="success">low</MenuItem>
          <MenuItem value="warning">high</MenuItem>
          <MenuItem value="error">critical</MenuItem>
        </Select>
      </FormControl>
    </Pop>
  );

  return (
    <DashboardContainer>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "18%",
          },
          padding: "20px",
        }}
      >
        {lists.map((list, i) => (
          <ListContainer key={list._id}>
            <Paper
              sx={{
                padding: "12px",
                margin: "auto",
                height: "auto",
                backgroundColor: "#fff",
                borderLeft: `10px solid ${list.color}`,
              }}
              key={list._id}
            >
              <div className="paper-header">
                <p>{list.name}</p>
                <Popover content={content} trigger="click" className="pops">
                  <TbDotsVertical style={{ cursor: "pointer" }} />
                </Popover>
              </div>
              <div className="addTask" onClick={() => setAddTask(list._id)}>
                <TbPlus size={19} />
                <span>Add a task</span>
              </div>
              {tasks.map((task, i) => {
                if (task.listId === list._id) {
                  return (
                    <div className="taskDetails-wrapper" key={task._id}>
                      <div className="taskDetails">
                        <div className="check">
                          <MuiCheckbox
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            className="checkbox"
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                          />
                        </div>
                        <div className="taskDetails-container-db">
                          <div className="t">
                            <div className="t-name">{task.taskName}</div>
                            <div className="t-text">{task.text}</div>
                          </div>
                          <div className="date-label">
                            <div className="date" sx={{ marginBotton: "10px" }}>
                              <DateTask dateNow={task.date} />
                            </div>
                            {task.priority === "low" ? (
                              <Tag color="success">{task.priority}</Tag>
                            ) : task.priority === "high" ? (
                              <Tag color="warning">{task.priority}</Tag>
                            ) : task.priority === "critical" ? (
                              <Tag color="error">{task.priority}</Tag>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <Popover content={taskContent} trigger="click">
                          <TbDotsVertical
                            style={{ cursor: "pointer" }}
                            className="dotsVertical-db"
                          />
                        </Popover>
                      </div>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
              {addTask === list._id ? (
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
                          onChange={(e) => setTName(e.target.value)}
                          value={list.taskName}
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
                          onChange={(e) => setTDName(e.target.value)}
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
                      {dateValue.length !== 0 ? (
                        <div className="date">
                          <Chip
                            label={`${dateNow[0]}, ${dateNow[1]} ${dateNow[2]}`}
                            color="primary"
                            value={dateValue.$d}
                            className="date-chip"
                            variant="outlined"
                            size="small"
                            onDelete={handleDelete}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {priority ? (
                        <Tag color={priority}>
                          {priority === "success"
                            ? "low"
                            : priority === "warning"
                            ? "high"
                            : priority === "error"
                            ? "critical"
                            : ""}
                        </Tag>
                      ) : (
                        ""
                      )}

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
                        <div>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={taskSubmit}
                          >
                            Submit
                          </Button>
                        </div>
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
              ) : (
                ""
              )}
              {completed ? (
                <div className="complete">
                  <Accordion sx={{ boxShadow: 0, padding: 0 }}>
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
              ) : (
                ""
              )}
            </Paper>
          </ListContainer>
        ))}
        {addList ? (
          <div className="addListName" onBlur={() => setAddList(false)}>
            <form onSubmit={listSubmit}>
              <input
                id="outlined-basic"
                placeholder="New List"
                variant="outlined"
                autoComplete="off"
                autoFocus
                ref={listRef}
              />
            </form>
            <TbPlus />
          </div>
        ) : (
          <Button
            className="newListButton"
            onClick={() => {
              setAddList(true);
            }}
          >
            <TbPlus /> &nbsp;Add new list
          </Button>
        )}
        {/* {buttons ? (
          <Button
            className="newListButton"
            onClick={() => {
              setAddList(true);
              setAddButtons(false);
            }}
          >
            <TbPlus /> &nbsp;Add new list
          </Button>
        ) : (
          ""
        )} */}
        {/* {addList ? (
          <div className="addListName" onBlur={() => setAddList(false)}>
            <form onSubmit={handleSubmit}>
              <input
                id="outlined-basic"
                placeholder="New List"
                variant="outlined"
                autoFocus
                ref={nameRef}
              />
            </form>
            <TbPlus />
          </div>
        ) : (
          <Button
            className="newListButton"
            onClick={() => {
              setAddList(true);
            }}
          >
            <TbPlus /> &nbsp;Add new list
          </Button>
        )} */}
      </Box>
    </DashboardContainer>
  );
};

export default Dashboard;

// {dateValue.$y !== 2022 ? (
//   <div className="date">
//     <Chip
//       label={`${dateNow[0]}, ${dateNow[1]} ${dateNow[2]}`}
//       color="primary"
//       className="date-chip"
//       variant="outlined"
//       size="small"
//       defaultValue={null}
//       onDelete={handleDelete}
//     />
//   </div>
// ) : (
//   ""
// )}

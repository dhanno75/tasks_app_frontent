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
import { addingList, getLists } from "../redux/features/ListSlice";
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
import BounceLoader from "react-spinners/BounceLoader";

const Dashboard = () => {
  // let date = new Date(Date.now()).toISOString().split("-");
  // let todaysDate = `${date[0]}-${date[1]}-${date[2][0]}${date[2][1]}`;
  const [addList, setAddList] = useState(false);
  const [ulName, setULName] = useState("");
  const [addTask, setAddTask] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [priority, setPriority] = useState("");

  const [editList, setEditList] = useState("false");

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
  console.log(ulName);

  useEffect(() => {
    dispatch(getLists({ userId }));
  }, [dispatch, userId]);

  const listSubmit = async (e) => {
    e.preventDefault();
    const name = listRef.current.value;
    setAddTask(true);
    setAddList(false);
    dispatch(addingList({ name }));
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

    await fetch(`${API}/lists/${values.listId}/tasks`, {
      method: "POST",
      body: JSON.stringify(values.vals),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const deleteList = async (listId) => {
    await fetch(`${API}/lists/deleteList/${listId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    window.location.reload();
  };

  const setListData = async function (list) {
    setULName(list.name);
  };

  const updateList = async (id) => {
    const res = await fetch(`${API}/lists/updateList/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: ulName }),
    });
    const data = await res.json();
    window.location.reload(false);
  };

  // const content = function () {
  //   return (
  //     <Pop>
  //       <ul>
  //         <li>
  //           <HiPencil /> <span> Rename list</span>
  //         </li>
  //         <li>
  //           <FaPaintBrush /> <span> Set color</span>
  //         </li>
  //         <li>
  //           <HiTrash onClick={() => deleteList()} />
  //           <span> Delete list</span>
  //         </li>
  //       </ul>
  //     </Pop>
  //   );
  // };

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
        {lists ? (
          lists.map((list, i) => (
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
                  {editList === true ? (
                    <form onSubmit={() => updateList(list._id)}>
                      <input
                        id="outlined-basic"
                        placeholder="New List"
                        autoComplete="off"
                        autoFocus
                        onChange={(e) => setULName(e.target.value)}
                        value={ulName}
                      />
                    </form>
                  ) : (
                    <p>{list.name}</p>
                  )}
                  <Popover
                    content={
                      <Pop>
                        <ul>
                          <li
                            onClick={() => {
                              setEditList(true);
                              setListData(list);
                            }}
                          >
                            <HiPencil /> <span> Rename list</span>
                          </li>
                          <li>
                            <FaPaintBrush /> <span> Set color</span>
                          </li>
                          <li onClick={() => deleteList(list._id)}>
                            <HiTrash />
                            <span> Delete list</span>
                          </li>
                        </ul>
                      </Pop>
                    }
                    trigger="click"
                    className="pops"
                  >
                    <TbDotsVertical style={{ cursor: "pointer" }} />
                  </Popover>
                </div>
                <div className="addTask" onClick={() => setAddTask(list._id)}>
                  <TbPlus size={19} />
                  <span>Add a task</span>
                </div>
                {list.results ? (
                  list.results.map((task, i) => {
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
                              <div
                                className="date"
                                sx={{ marginBotton: "10px" }}
                              >
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
                  })
                ) : (
                  <></>
                )}
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
          ))
        ) : (
          <BounceLoader color="#36d7b7" />
        )}
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

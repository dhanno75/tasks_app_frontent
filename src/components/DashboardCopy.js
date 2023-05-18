import React, { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { TbPlus } from "react-icons/tb";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getLists } from "../redux/features/ListSlice";
import { getTasks } from "../redux/features/TaskSlice";
import { DashboardContainer } from "./styled_components/dashboardContainer";

const Dashboard = () => {
  const [addList, setAddList] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [buttons, setAddButtons] = useState(false);

  const listRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { lists } = useSelector((state) => state.list);
  console.log(lists);
  const { tasks } = useSelector((state) => state.task);
  console.log(tasks);

  const listTasks = function () {
    lists.forEach((list) => {
      dispatch(getTasks({ listId: list._id }));
    });
  };

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
    setAddButtons(true);
    setAddList(false);
  };

  const taskSubmit = (e, taskRef, taskDetailRef) => {
    e.preventDefault();
  };

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
        {addTask ? (
          <Task titleName={titleName} />
        ) : addList ? (
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

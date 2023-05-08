import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import { TbPlus } from "react-icons/tb";
import List from "./List";

const Dashboard = () => {
  const [addList, setAddList] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [buttons, setAddButtons] = useState(false);
  const listRef = useRef();

  const listSubmit = (e) => {
    e.preventDefault();
    const name = listRef.current.value;
    setTitleName(name);
    setAddTask(true);
    setAddButtons(true);
  };

  const taskSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
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
        {/*
        <Paper sx={{ padding: "20px" }} className="paper">
          <div className="paper-initial">
            <p>
              <TbPlus /> Add new list
            </p>
          </div>
        </Paper> */}

        {addTask ? (
          <List titleName={titleName} />
        ) : addList ? (
          <div className="addListName" onBlur={() => setAddList(false)}>
            <form onSubmit={listSubmit}>
              <input
                id="outlined-basic"
                placeholder="New List"
                variant="outlined"
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

        {buttons ? (
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
        )}

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
    </Container>
  );
};

const Container = styled.div`
  background-color: #fffff0;

  .paper {
    display: flex;
  }

  .paper-initial {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #737373;

    p {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      font-family: Raleway;
      word-spacing: 2px;
    }
    svg {
      font-size: 12px;
      color: #525252;
    }
  }

  .newListButton {
    background-color: #fff;
    color: #525252;
    box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.2);
    height: 55px;

    &:hover {
      background-color: #57c56b;
      color: #006711;
    }
  }

  .addListName {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 18%;
    height: fit-content !important;
    height: auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, 0.2);

    input {
      width: 90%;
      outline: none;
      border: none;
      border-radius: 5px;
      padding: 7px 0;

      &:focus {
        outline: none;
      }
    }

    svg {
      cursor: pointer;
      color: #33d402;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Container>
      <div className="left">
        <p className="logo">Todo App</p>
        <div>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div className="right">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </Container>
  );
};

const Container = styled.nav`
  width: 100vw;
  height: 70px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: rgb(43, 124, 73);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 12%;

    p {
      font-size: 22px;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 10%;
  }

  a {
    text-decoration: none;
    font-size: 18px;
    color: rgb(201, 249, 219);
    /* padding: 10px; */
    height: 100%;
    transition: all 0.3s;

    &:hover {
      color: rgb(224, 249, 3);
    }
  }
`;

export default Navigation;

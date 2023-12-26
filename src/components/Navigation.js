import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

const Navigation = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    toast.warn("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Container isLoggedIn={isLoggedIn}>
      <div className="left">
        <Link to="/">
          <div className="logo">TasksBoard</div>
        </Link>
        <div>{isLoggedIn ? <Link to="/mainBoard">Tasks</Link> : <></>}</div>
      </div>

      <div className="right">
        {isLoggedIn ? <p>Hi, {name}</p> : <Link to="/signup">Sign Up</Link>}
        {isLoggedIn ? (
          <FiLogOut onClick={handleLogout} />
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </Container>
  );
};

const Container = styled.nav`
  min-width: 100vw;
  width: 100vw;
  height: 70px;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #094507;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 11%;

    .logo {
      font-size: 22px;
      margin: 0;
      color: #d4af37;
      align-self: center;
    }
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 10%; */
    width: 10%;
    margin-right: 12px;

    p {
      font-size: 18px;
      height: 100%;
      margin-bottom: 0;
      color: #b5c7b5;
    }

    svg {
      background: transparent;
      font-size: 22px;
      color: #b5c7b5;
      cursor: pointer;
    }
  }

  a {
    text-decoration: none;
    font-size: 18px;
    color: #b5c7b5;
    /* padding: 10px; */
    height: 100%;
    transition: all 0.3s;

    &:hover {
      color: rgb(224, 249, 3);
    }
  }
`;

export default Navigation;

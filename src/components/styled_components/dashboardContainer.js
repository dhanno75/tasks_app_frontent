import styled from "styled-components";

export const DashboardContainer = styled.div`
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
      font-family: Raleway, "sans-serif";
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
      color: #e3eae4;
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

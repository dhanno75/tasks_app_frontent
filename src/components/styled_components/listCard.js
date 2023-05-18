import styled from "styled-components";

export const Pop = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    li {
      padding: 3px 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #525252;
      transition: all 0.3s;
      font-size: 14px;
      font-family: Raleway, "sans-serif";
      font-weight: 500;
      svg {
        margin-right: 8px;
        align-self: center;
      }

      &:hover {
        color: #333;
      }
    }
  }
`;

export const ListContainer = styled.div`
  .paper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #737373;
    padding: 10px 0;

    p {
      margin-bottom: 0;
      font-size: 15px;
      font-weight: 500;
      font-family: Raleway;
      word-spacing: 2px;
    }

    svg {
      font-size: 24px;
      color: #525252;
    }
  }

  .addTask {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    padding-top: 14px;
    padding-bottom: 5px;
    cursor: pointer;

    span {
      font-size: 13px;
      font-weight: 500;
      font-family: Raleway;
      letter-spacing: 1px;
    }

    svg {
      color: #57c56b;
      margin-right: 6px;
      border-radius: 50%;
    }

    &:hover {
      color: #57c56b;
    }

    &:hover svg {
      background-color: #57c56b;
      color: #fff;
    }
  }

  .taskDetails-wrapper {
    padding-top: 15px;
    padding-bottom: 8px;

    .check {
      display: flex;
      align-items: flex-start;

      .checkbox {
        align-self: self-start;
        height: 4px;
        width: 4px;
        margin-top: 4px;
      }
    }
    .taskDetails {
      display: flex;
    }

    .taskDetails-container {
      padding: 0 12px;

      .taskName {
        margin-bottom: 5px;
        .t-name {
          font-size: 14px;
        }
        .t-text {
          font-size: 12px;
        }
      }

      textarea {
        outline: none;

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: #a3a2a2;
        }
      }

      .taskTitle {
        padding-bottom: 0;
        margin-bottom: 0;
        font-size: 14px;

        &::placeholder {
          font-size: 14px;
          font-weight: 500;
          padding-bottom: 0;
        }
      }

      .taskDetail {
        padding-top: 0;
        margin-top: 0;
        font-size: 12px;

        &::placeholder {
          font-size: 12px;
          font-weight: 500;
          padding-top: 0;
        }
      }

      svg {
        font-size: 28px;
        padding: 5px;
        border-radius: 100px;
        cursor: pointer;
        color: #434343;

        &:not(:last-child) {
          margin-right: 5px;
        }

        &:hover {
          background-color: #d7d7d7;
        }
      }

      .attachments {
        display: flex;
        margin-left: -3.5px;
      }
    }

    .taskDetails-container-db {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-start;
      width: 100%;
      padding: 0 12px;

      .t {
        flex: 1;
        color: #5b5a5a;

        .t-name {
          font-size: 14px;
          font-family: Raleway, "sans-serif";
          font-weight: 600;
        }

        .t-text {
          font-size: 12px;
          font-family: Raleway, "sans-serif";
          font-weight: 500;
        }
      }
    }

    .dotsVertical-db {
      font-size: 24px;
    }

    .dotsVertical {
      font-size: 30px;
    }
  }

  .complete {
    .complete-details {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .complete-icons {
        width: 20px;
        svg {
          font-size: 20px;
          color: #0472d8;
          cursor: pointer;
        }

        .trash {
          color: #fa6d08 !important;
          font-size: 18px;
        }
      }

      p {
        margin-bottom: 0;
        margin-left: 4px;
        flex: 1;
        text-decoration: line-through;
        text-decoration-color: #5b5b5b;
      }
    }
  }
`;

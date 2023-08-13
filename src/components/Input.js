import React, { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import "../App.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import { BsHearts } from "react-icons/bs";

const Input = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  function addItem() {
    if (!input) return;
    else {
      setList((list) => {
        const outputList = [...list, input];

        setInput("");

        return outputList;
      });
    }
  }

  function deleteItem(i) {
    const newItems = list.filter((item, id) => id !== i);
    setList(newItems);

    console.log("Updated List => ", newItems);
  }

  function deleteAll() {
    setList([]);
    console.log("Updated List => ", list);
  }

  const important = (i) => {
    const updatedList = [...list];
    updatedList[i] = (
      <div className="item" style={{ color: "rgb(0, 255, 0)" }}>
        {updatedList[i]}
      </div>
    );
    setList(updatedList);
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div>
        <div className="Input">
          <input
            type="text"
            placeholder="Create your task..."
            className="inputText"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="addButton">
            <MdAddCircleOutline
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Add Item"
              onClick={() => {
                toast.success("Item Added", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  theme: "colored",
                });
                addItem();
              }}
            />
          </span>
        </div>

        <div className="itemsList">
          {list !== [] &&
            list.map((items, i) => (
              <div className="list" key={i}>
                <div className="item"> {items} </div>

                <div className="options">
                  <RiDeleteBin5Line
                    className="deleteButton"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Delete"
                    onClick={() => {
                      toast.error("Item Deleted", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        theme: "colored",
                      });
                      deleteItem(i);
                    }}
                  />
                  <Tooltip id="my-tooltip" />
                  <BsCheckLg
                    className="completeButton"
                    onClick={() => important(i)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Completed"
                  />
                </div>
              </div>
            ))}

          {list && list.length > 1 ? (
            <div className="deleteAll">
              <RiDeleteBin5Line
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Delete All Items"
                className="all"
                onClick={() => {
                  toast.error("All Item Deleted", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "colored",
                  });
                  deleteAll();
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="footer">
        Created With <BsHearts /> from Avinash
      </div>
    </div>
  );
};

export default Input;

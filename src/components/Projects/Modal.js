import React, { useRef, useState } from "react";
import "./Modal.css";
import user3 from "../../assets/users/user3.png";
import cross from "../../assets/cross.png";
const Modal = ({
  list,
  id,
  title,
  text,
  writer,
  commentscount,
  src,
  setprojects,
  projects,
  setselected,
}) => {
  console.log(list);
  const [doubleclick, setdoubleclick] = useState(false);
  const [titleref, settitleref] = useState(title);
  const [descref, setdescref] = useState(text);
  const handleDoubleClick = () => {
    setdoubleclick(true);
  };
  const handlesubmit = () => {
    var t = projects;
    console.log(t);
    var x = t[list].findIndex((project) => project.id === id);
    console.log(x, id);
    t[list][x].title = titleref;
    t[list][x].text = descref;
    setprojects(t);
    setselected({});
  };
  return (
    <div className="backdrop-modal">
      {!doubleclick && (
        <div className="modal">
          <img className="cross" style={{cursor:"pointer"}} onClick={() => setselected({})} src={cross} />

          <div
            onDoubleClick={handleDoubleClick}
            style={{ paddingLeft: "34px" }}
            className="title"
          >
            <h3>{title}</h3>
          </div>
          <div className="info-container">
            <div className="writer">
              <p className="dummy">Created By</p>
              <div onDoubleClick={handleDoubleClick} className="writer-name">
                <img src={user3} />
                <p>{writer}</p>
              </div>
            </div>
            <div className="desc-container">
              <p className="dummy">Description</p>
              <p onDoubleClick={handleDoubleClick} className="desc">
                {text}
              </p>
            </div>
          </div>
        </div>
      )}
      {doubleclick && (
        <div
          className="modal"
          style={{
            paddingTop: "19px",
          }}
        >
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setselected({})}
            className="cross"
            src={cross}
          />

          <div style={{ paddingLeft: "34px" }} className="title">
            <input
              className="titleinput"
              value={titleref}
              onChange={(e) => settitleref(e.target.value)}
            />
          </div>
          <div className="info-container">
            <div className="writer">
              <p
                className="dummy"
                style={{ position: "relative", top: "10px" }}
              >
                Created By
              </p>
              <div style={{ marginTop: "18px" }} className="writer-name">
                <img src={user3} />
                <p>{writer}</p>
              </div>
            </div>
            <div style={{ marginTop: "10px" }} className="desc-container">
              <p className="dummy">Description</p>
              <input
                style={{
                  width: "390px",
                  height: "51px",
                  left: "1038px",
                  top: "386px",
                  border: "1px solid #EEEEEE",
                  borderRadius: "6px",
                }}
                value={descref}
                onChange={(e) => setdescref(e.target.value)}
              />
            </div>
          </div>
          <button className="submit" onClick={handlesubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;

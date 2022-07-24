import React, { useRef, useState } from "react";
import "./Projects.css";
import filterimg from "../../assets/filter.png";
import plusimg from "../../assets/plus.png";
import commentimg from "../../assets/comment.png";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import user7 from "../../assets/users/user7.png";
import threedot from "../../assets/more.png";
import dummyuser from "../../assets/dummy-user.png";
import user2 from "../../assets/users/user2.png";
import user3 from "../../assets/users/user3.png";
import user4 from "../../assets/users/user4.png";
import user5 from "../../assets/users/user5.png";
import user6 from "../../assets/users/user6.png";
import Modal from "./Modal";

const Projects = () => {
  const titleref = useRef();
  const descref = useRef();
  const [selected, setselected] = useState({});
  var idList = {
    todo: "todo",
    inprogress: "inprogress",
    completed: "completed",
  };
  const [projects, setprojects] = useState({
    todo: [],
    inprogress: [],
    completed: [],
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const getList = (id) => projects[idList[id]];

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  });
  function handleOnDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Sorting in same list
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      setprojects((state) => {
        return { ...state, [source.droppableId]: items };
      });
    }
    // Interlist movement
    else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setprojects((prev) => {
        return {
          ...prev,
          [source.droppableId]: result[source.droppableId],
          [destination.droppableId]: result[destination.droppableId],
        };
      });
    }
  }
  console.log(selected);
  const keyPressed = (event, list, inx) => {
    // console.log(event);
    if (event.key === "Enter") {
      var x = [];
      if (list === "todo") {
        var x = projects["todo"].filter((item, index) => index !== inx);
        x.unshift({
          id: projects["todo"].length + 1,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        setprojects((state) => {
          return { ...state, todo: x };
        });
      } else if (list === "inprogress") {
        var x = projects["inprogress"].filter((item, index) => index !== inx);
        x.unshift({
          id: projects["inprogress"].length + 1 + 1000,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        setprojects((state) => {
          return { ...state, inprogress: x };
        });
      } else {
        var x = projects["completed"].filter((item, index) => index !== inx);
        x.unshift({
          id: projects["completed"].length + 1 + 10000,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        setprojects((state) => {
          return { ...state, completed: x };
        });
      }
    }
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle,
  });

  return (
    <div className="projects">
      <div className="projects-bar">
        <h3>Projects</h3>
        <div className="filter">
          <img src={filterimg} />
          <p>Filter</p>
        </div>
      </div>
      <div className="projects-list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="todo">
            <div className="list-index">
              <h4>To Do</h4>
              <p>{projects["todo"].length}</p>
            </div>
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                var x = {
                  id: Math.random() * 10000,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                };
                setprojects((state) => {
                  return { ...state, todo: [x, ...state.todo] };
                });
              }}
              className="plus"
            >
              <img src={plusimg} />
            </button>

            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <ul
                  className="todo"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  //   style={getListStyle(snapshot.isDraggingOver)}
                >
                  {projects["todo"].map(
                    (
                      { id, title, text, src, writer, commentscount },
                      index
                    ) => {
                      if (title.length > 0)
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                // style={getItemStyle(
                                //   snapshot.isDragging,
                                //   provided.draggableProps.style
                                // )}
                              >
                                <div className="row">
                                  {" "}
                                  <h4>{title}</h4>
                                  <img
                                    onClick={() => {
                                      setselected({
                                        list: "todo",
                                        data: projects["todo"][index],
                                      });
                                    }}
                                    style={{ cursor: "pointer" }}
                                    src={threedot}
                                  />
                                </div>

                                <p
                                  style={{ width: "87%", marginLeft: "-2px" }}
                                  className="text"
                                >
                                  {text}
                                </p>
                                <div className="writer-info">
                                  <img className="user-pic" src={src} />
                                  <div className="comments">
                                    <p>{commentscount}</p>
                                    <img src={commentimg} />
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      if (title.length == 0) {
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <input
                                  ref={titleref}
                                  className="title"
                                  placeholder="Give your task a title"
                                />
                                <input
                                  ref={descref}
                                  className="description"
                                  placeholder="Description"
                                  onKeyPress={(event) => {
                                    keyPressed(event, "todo", index);
                                  }}
                                ></input>
                                <div className="writer-info">
                                  <img className="user-pic" src={dummyuser} />
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      }
                    }
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="inprogress">
            <div className="list-index">
              <h4>In progress</h4>
              <p>{projects["inprogress"].length}</p>
            </div>
            <button
              onClick={() => {
                var x = {
                  id: projects.completed.length + 1000,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                };
                setprojects((state) => {
                  return { ...state, inprogress: [x, ...state.inprogress] };
                });
              }}
              className="plus"
              style={{ cursor: "pointer" }}
            >
              <img src={plusimg} />
            </button>
            <Droppable droppableId="inprogress">
              {(provided) => (
                <ul
                  className="inprogress"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {projects["inprogress"].map(
                    (
                      { id, title, text, src, writer, commentscount },
                      index
                    ) => {
                      if (title.length > 0)
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="row">
                                  {" "}
                                  <h4>{title}</h4>
                                  <img
                                    style={{ cursor: "pointer" }}
                                    src={threedot}
                                    onClick={() => {
                                      setselected({
                                        list: "inprogress",
                                        data: projects["inprogress"][index],
                                      });
                                    }}
                                  />
                                </div>
                                <p
                                  style={{ width: "87%", marginLeft: "-2px" }}
                                  className="text"
                                >
                                  {text}
                                </p>
                                <div className="writer-info">
                                  <img className="user-pic" src={src} />
                                  <div className="comments">
                                    <p>{commentscount}</p>
                                    <img src={commentimg} />
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      if (title.length == 0) {
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <input
                                  ref={titleref}
                                  className="title"
                                  placeholder="Give your task a title"
                                />
                                <input
                                  ref={descref}
                                  className="description"
                                  placeholder="Description"
                                  onKeyPress={(event) => {
                                    keyPressed(event, "inprogress", index);
                                  }}
                                ></input>
                                <div className="writer-info">
                                  <img className="user-pic" src={dummyuser} />
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      }
                    }
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className="completed">
            <div className="list-index">
              <h4>Completed</h4>
              <p>{projects["completed"].length}</p>
            </div>
            <button
              onClick={() => {
                var x = {
                  id: projects.completed.length + 10000,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                };
                setprojects((state) => {
                  return { ...state, completed: [x, ...state.completed] };
                });
              }}
              className="plus"
              style={{ cursor: "pointer" }}
            >
              <img src={plusimg} />
            </button>
            <Droppable droppableId="completed">
              {(provided) => (
                <ul
                  className="completed"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {projects["completed"].map(
                    (
                      { id, title, text, src, writer, commentscount },
                      index
                    ) => {
                      if (title.length > 0)
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="row">
                                  {" "}
                                  <h4>{title}</h4>
                                  <img
                                    style={{ cursor: "pointer" }}
                                    src={threedot}
                                    onClick={() => {
                                      setselected({
                                        list: "completed",
                                        data: projects["completed"][index],
                                      });
                                    }}
                                  />
                                </div>
                                <p
                                  style={{ width: "87%", marginLeft: "-2px" }}
                                  className="text"
                                >
                                  {text}
                                </p>
                                <div className="writer-info">
                                  <img className="user-pic" src={src} />
                                  <div className="comments">
                                    <p>{commentscount}</p>
                                    <img src={commentimg} />
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      if (title.length == 0) {
                        return (
                          <Draggable
                            key={id}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                className="listitem"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <input
                                  ref={titleref}
                                  className="title"
                                  placeholder="Give your task a title"
                                />
                                <input
                                  ref={descref}
                                  className="description"
                                  placeholder="Description"
                                  onKeyPress={(event) => {
                                    keyPressed(event, "completed", index);
                                  }}
                                ></input>
                                <div className="writer-info">
                                  <img className="user-pic" src={dummyuser} />
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      }
                    }
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      {selected.data && selected.data["id"] && (
        <Modal
          list={selected.list}
          {...selected.data}
          setprojects={setprojects}
          setselected={setselected}
          projects={projects}
        />
      )}
    </div>
  );
};

export default Projects;

{
  /* <div className="App">
        <header className="App-header">
          <h1>Final Space Characters</h1>
          </header>
        <p>
          Images from{" "}
          <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
            Final Space Wiki
          </a>
        </p>
      </div> */
}

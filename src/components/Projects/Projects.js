import React, { useRef, useState } from "react";
import "./Projects.css";
import filterimg from "../../assets/filter.png";
import plusimg from "../../assets/plus.png";
import commentimg from "../../assets/comment.png";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import user7 from "../../assets/users/user7.png";
import dummyuser from "../../assets/dummy-user.png";
import user2 from "../../assets/users/user2.png";
import user3 from "../../assets/users/user3.png";
import user4 from "../../assets/users/user4.png";
import user5 from "../../assets/users/user5.png";
import user6 from "../../assets/users/user6.png";
const finalSpaceCharacters = [
  {
    id: 1,
    title: "gary",
    text: "Gary Goodspeed",
    writer: "/images/gary.png",
    commentscount: 1,
    src: user2,
  },
];

const Projects = () => {
  const [todo, settodo] = useState(finalSpaceCharacters);
  const [inprogress, setinprogress] = useState([]);
  const [completed, setcompleted] = useState([]);
  const titleref = useRef();
  const descref = useRef();
  function handleOnDragEndtodo(result) {
    if (!result.destination) return;

    const items = Array.from(todo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    settodo(items);
  }
  function handleOnDragEndcompleted(result) {
    if (!result.destination) return;

    const items = Array.from(completed);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setcompleted(items);
  }
  function handleOnDragEndinprogress(result) {
    if (!result.destination) return;

    const items = Array.from(inprogress);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setinprogress(items);
  }
  const keyPressed = (event, list, inx) => {
    console.log(event);
    if (event.key === "Enter") {
      var x = [];
      if (list === "todo") {
        var x = todo.filter((item, index) => index !== inx);
        x.unshift({
          id: todo.length + 1,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        settodo(x);
      } else if (list === "inprogress") {
        var x = inprogress.filter((item, index) => index !== inx);
        x.unshift({
          id: inprogress.length + 1,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        setinprogress(x);
      } else {
        var x = completed.filter((item, index) => index !== inx);
        x.unshift({
          id: completed.length + 1,
          title: titleref.current.value,
          text: descref.current.value,
          writer: "Amogh",
          commentscount: 0,
          src: user2,
        });
        setcompleted(x);
      }
    }
  };
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
        <div className="todo">
          <div className="list-index">
            <h4>To Do</h4>
            <p>{todo.length}</p>
          </div>
          <button
            onClick={() => {
              settodo((prev) => [
                {
                  id: Math.random() * 10,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                },
                ...prev,
              ]);
            }}
            className="plus"
          >
            <img src={plusimg} />
          </button>
          <DragDropContext onDragEnd={handleOnDragEndtodo}>
            <Droppable droppableId="todolist">
              {(provided) => (
                <ul
                  className="todolist"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todo.map(
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
                                <h4>{title}</h4>
                                <p className="text">{text}</p>
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
          </DragDropContext>
        </div>
        <div className="inprogress">
          <div className="list-index">
            <h4>In progress</h4>
            <p>{inprogress.length}</p>
          </div>
          <button
            onClick={() => {
              setinprogress((prev) => [
                {
                  id: Math.random() * 10,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                },
                ...prev,
              ]);
            }}
            className="plus"
          >
            <img src={plusimg} />
          </button>
          <DragDropContext onDragEnd={handleOnDragEndinprogress}>
            <Droppable droppableId="inprogresslist">
              {(provided) => (
                <ul
                  className="inprogresslist"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {inprogress.map(
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
                                <h4>{title}</h4>
                                <p className="text">{text}</p>
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
          </DragDropContext>
        </div>
        <div className="completed">
          <div className="list-index">
            <h4>Completed</h4>
            <p>{completed.length}</p>
          </div>
          <button
            onClick={() => {
              setcompleted((prev) => [
                {
                  id: Math.random() * 10,
                  title: "",
                  text: "",
                  src: "",
                  writer: "",
                  commentscount: 0,
                },
                ...prev,
              ]);
            }}
            className="plus"
          >
            <img src={plusimg} />
          </button>
          <DragDropContext onDragEnd={handleOnDragEndcompleted}>
            <Droppable droppableId="completedlist">
              {(provided) => (
                <ul
                  className="completedlist"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {completed.map(
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
                                <h4>{title}</h4>
                                <p className="text">{text}</p>
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
          </DragDropContext>
        </div>
      </div>
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

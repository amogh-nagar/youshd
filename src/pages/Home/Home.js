import React, { useState } from "react";
import "./Home.css";
import crossicon from "../../assets/cross.png";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import homeimg from "../../assets/home.png";
import statsimg from "../../assets/stats.png";
import projectsimg from "../../assets/projects.png";
import chatimg from "../../assets/chat.png";
import calendarimg from "../../assets/calendar.png";
import settingsimg from "../../assets/settings.png";
import logoutimg from "../../assets/logout.png";
import searchicon from "../../assets/search.png";
import usericon from "../../assets/user.png";
import usersicon from "../../assets/users.png";
import { authActions } from "../../redux/auth";
import user7 from "../../assets/users/user7.png";
import user2 from "../../assets/users/user2.png";
import user3 from "../../assets/users/user3.png";
import user4 from "../../assets/users/user4.png";
import user5 from "../../assets/users/user5.png";
import user6 from "../../assets/users/user6.png";
import Projects from "../../components/Projects/Projects";

function Home() {
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(authActions.logout());
  };
  const [usersmodal, setusersmodal] = useState(false);
  const projectmembers = [
    {
      src: user2,
      name: "Saundarya ",
      email: "saundarya@idc.com",
    },
    {
      src: user3,

      name: "Vaibhav ",
      email: "vaibhav@idc.com",
    },
    {
      src: user4,

      name: "Sudhanshu",
      email: "sudhanshu@idc.com",
    },
    {
      src: user5,

      name: "Shruti ",
      email: "shruti@idc.com",
    },
    {
      src: user6,

      name: "Himanshu ",
      email: "himanshu@idc.com",
    },
    {
        src: user7,
  
        name: "Alex",
        email: "alex@idc.com",
      },
  ];
  return (
    <div className="home">
      <div className="sidebar">
        <div className="head">
          <h4 style={{ position: "relative", left: "3rem" }}>.taskez</h4>
          <ul>
            <li>
              <img src={homeimg} /> <p>Overview</p>
            </li>
            <li>
              <img src={statsimg} />
              <p>Stats</p>
            </li>
            <li>
              <img
                style={{
                  objectFit: "contain",
                }}
                src={projectsimg}
              />
              <p
                style={{
                  fontWeight: 500,
                  color: "#212121",
                }}
              >
                Projects
              </p>
            </li>
            <li>
              <img src={chatimg} />
              <p>Chat</p>
            </li>
            <li>
              <img src={calendarimg} />
              <p>Calendar</p>
            </li>
          </ul>
        </div>
        <div className="logout">
          <ul>
            <li>
              <img src={settingsimg} />
              <p>Settings</p>
            </li>
            <li onClick={handlelogout}>
              <img src={logoutimg} />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="projects-div">
        <div className="search">
          <div className="search-bar">
            <img src={searchicon} />
            <p>Search</p>
          </div>
          <img
            onClick={() => setusersmodal(true)}
            className="users"
            src={usersicon}
          />
          <div className="user-name">
            <p>Hi Amogh</p>
            <img src={usericon} />
          </div>
        </div>
        <Projects />
      </div>
      {usersmodal && (
        <div className="backdrop">
          <div className="users-modal">
            <div className="users-modal-nav">
              <p>Project Members</p>
              <img onClick={()=>setusersmodal(false)} src={crossicon} />
            </div>
            <div>
              <ul>
                {projectmembers.map((item) => (
                  <li className="user-list">
                    <img src={item.src} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

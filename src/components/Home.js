import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import { fetchSkill } from "../store/skill/skill-action";
import { alertActions } from "../store/alert/alert-slice";
import { Link } from "react-router-dom";

function HomePage() {
  const token = useSelector((state) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const skills = useSelector((state) => state.skill.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    if (skills.length === 0) {
      dispatch(fetchSkill(token));
    }
  }, [dispatch, skills.length, token]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/skill/findSkills?skillName=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.msg);
      } else {
        const { neighborUsers } = data;
        if (neighborUsers.length > 0) {
          setSearchResults(neighborUsers);
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content:
            err && err.message ? err.message : "No Searched SkillName found",
        })
      );
    }
  };

  return (
    <div className="home-page-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search skills"
        className="search-input"
      />

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <div className="style-flex">
        <h5>My Skills </h5>
        <Link to="/add-skill">Add Skill</Link>
      </div>

      <table className="skill-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id}>
              <td>{skill.name}</td>
              <td>{skill.tip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Searched Skills and Tips</h2>
      <table className="skill-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Contact Info</th>
            <th>Name</th>
            <th>Tip</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.contactInfo}</td>
              <td>{user.skills[0].name}</td>
              <td>{user.skills[0].tip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;

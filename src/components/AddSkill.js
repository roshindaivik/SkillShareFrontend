import React, { useState } from "react";
import "./AddSkill.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddSkills } from "../store/skill/skill-action";

function AddSkill() {
  const token = useSelector((state) => state.auth.token);
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [tip, setTip] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddSkill = () => {
    setSkills([...skills, { name, tip }]);
    setName("");
    setTip("");
  };

  const handleSaveSkill = () => {
    dispatch(AddSkills(skills, navigate, token));
    setSkills([]);
  };

  return (
    <div className="add-skill-container">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Skill name"
        className="add-skill-input"
      />
      <input
        type="text"
        value={tip}
        onChange={(e) => setTip(e.target.value)}
        placeholder="Skill tip"
        className="add-skill-input"
      />
      <button onClick={handleAddSkill} className="add-skill-button">
        Add Skill
      </button>
      <ul className="skill-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            <h2 className="skill-name">{skill.name}</h2>
            <p className="skill-tip">{skill.tip}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleSaveSkill} className="add-skill-button">
        Save Skills
      </button>
    </div>
  );
}

export default AddSkill;

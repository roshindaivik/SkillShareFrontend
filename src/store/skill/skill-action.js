import { alertActions } from "../alert/alert-slice.js";
import { skillActions } from "./skill-slice.js";

export const AddSkills = (skills, navigate, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/skill/add-skills`,
        {
          method: "POST",
          body: JSON.stringify({
            skills: skills,
          }),
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
        const { user } = data;
        dispatch(
          skillActions.addSkills({
            skills: user.skills,
          })
        );
        navigate("/home");
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Failed to add skills",
        })
      );
    }
  };
};

export const fetchSkill = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/skill/fetch`,
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
        const { skills } = data;
        console.log(skills);
        dispatch(
          skillActions.addSkills({
            skills: skills,
          })
        );
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Failed to Fetch skills",
        })
      );
    }
  };
};

export const findSkill = (token, skillName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/skill/findSkills?skillName=${skillName}`,
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
        return neighborUsers;
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Failed to Fetch skills",
        })
      );
    }
  };
};

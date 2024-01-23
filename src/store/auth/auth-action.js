import { alertActions } from "../alert/alert-slice.js";
import { skillActions } from "../skill/skill-slice.js";
import { authActions } from "./auth-slice.js";

export const loginUser = (email, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.msg);
      } else {
        const { user, token } = data;
        dispatch(authActions.setUserDetails({ user, token }));
        if (user.skills.length === 0) {
          navigate("/add-skills");
        } else {
          dispatch(skillActions.addSkills({ skills: user.skills }));
          navigate("/home");
        }
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Something went wrong ",
        })
      );
    }
  };
};

export const registerUser = (userDetails, navigate) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        {
          method: "POST",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data?.msg);
      } else {
        const { user, token } = data;
        dispatch(authActions.setUserDetails({ user, token }));
        navigate("/add-skill");
      }
    } catch (err) {
      dispatch(
        alertActions.setAlert({
          content: err && err.message ? err.message : "Not a Valid Input",
        })
      );
    }
  };
};

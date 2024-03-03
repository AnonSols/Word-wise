import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import styles from "./User.module.css";
import { FAKE_USER } from "../types/authModel";

function User() {
  const user = FAKE_USER;
  const { Logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    Logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.AVATAR} alt={user.NAME} />
      <span>Welcome, {user.NAME}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

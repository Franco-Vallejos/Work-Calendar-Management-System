// Login.jsx
import { useState } from "react";
import { useAuth} from "../auth/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) {
    navigate("/loged");
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.setIsAuthenticated(true);
    navigate("/loged");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>DNI</label>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;

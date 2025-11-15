import { NavLink } from "react-router";
import "./AppNav.css";

export default function AppNav() {
  return (
    <nav className="AppNav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/app">Wander</NavLink>
      <NavLink to="/auth" className={"AppNav__auth_link"}>Log In/Sign Up</NavLink>
    </nav>
  )
}
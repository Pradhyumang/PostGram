import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
const NavbarRenderer = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavbarRenderer;

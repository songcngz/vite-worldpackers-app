import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
function Sidebar() {
  const date = new Date();
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copright {date.getFullYear()} by WorldPackers Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;

import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Follow your dreams...
          <br />
          <em>WorlPackers</em> will be with you as you follow your dreams.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link className="cta" to="/login">
          Start Dreams Now
        </Link>
      </section>
    </main>
  );
}

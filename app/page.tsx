import { IconChevronDown } from '@tabler/icons';
import Palette from '../components/palette/Palette';
import styles from './page.module.css';

const Home = () => (
  <>
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        Paalette
      </div>
      {/* <div className={styles.buttonsContainer}>
        <a className={styles.link} href="/editor">
          Editor
        </a>
      </div> */}
      <div className={styles.exploreIndicator}>
        Colors
        <IconChevronDown />
      </div>
    </div>
    <Palette />
  </>
);

export default Home;

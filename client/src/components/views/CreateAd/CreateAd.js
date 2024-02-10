import CreateAdForm from "../../features/CreateAdForm/CreateAdForm";
import styles from '../CreateAd/CreateAd.module.scss'

const CreateAd = () => (
  <section className="createAd">
    <h2 className={styles.title}>Add your advertise </h2>
    <CreateAdForm />  
  </section>
);
  
export default CreateAd;
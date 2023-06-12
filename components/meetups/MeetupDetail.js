import Card from "../ui/Card";
import styles from "./MeetupDetail.module.css"

const MeetupDetails = (props) => {
  return (
    <section className={styles.detail}>
      <div>
        <img src={props.img} alt={props.title} />
      </div>
      <div>
        <h3> {props.title}</h3>
        <address>{props.address}</address>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </section>
  );
};

export default MeetupDetails;

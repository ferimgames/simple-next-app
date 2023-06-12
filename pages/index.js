import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </>
  );
};

export const getStaticProps = async (ctx) => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextprocject:3Q5PmRJp1WInqkki@cluster0.ob1krgr.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsColletion = db.collection("meetups");
  const meetups = await meetupsColletion.find().toArray();
  console.log(meetups);
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        img: meetup.img,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;

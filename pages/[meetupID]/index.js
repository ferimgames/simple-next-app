import Head from "next/head";
import MeetupDetails from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const DetailMeetupPage = (props) => {
  const meetupData = props.meetupData;

  return (
    <>
    <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description}/>
    </Head>
    <MeetupDetails
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
      img={meetupData.img}
    />
    
    
    </>
  );
};
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextprocject:3Q5PmRJp1WInqkki@cluster0.ob1krgr.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsColletion = db.collection("meetups");

  const meetups = await meetupsColletion.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
    fallback: 'blocking',
  };
};
export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupID;

  const client = await MongoClient.connect(
    "mongodb+srv://nextprocject:3Q5PmRJp1WInqkki@cluster0.ob1krgr.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        img: selectedMeetup.img,
        description: selectedMeetup.description,
      },
    },
  };
}
export default DetailMeetupPage;

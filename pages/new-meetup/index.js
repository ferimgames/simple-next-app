import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHanlder = async (enteredMeetupData) => {

    const response = await fetch("/api/new-meetup/", {
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();

    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Create new meetup</title>
        <meta
          name="description"
          content="Create new meetup"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHanlder} />
    </>
  );
};

export default NewMeetupPage;

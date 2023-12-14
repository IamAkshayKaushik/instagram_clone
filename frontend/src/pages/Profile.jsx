import ProfileHeader from "../components/ProfileHeader";
import Highlights from "../components/Highlights";
import ProfilePosts from "../components/ProfilePosts";
import Footer from "../components/Footer";

function Profile() {
  return (
    <>
      <section className="container pt-8 max-w-5xl">
        <main className="bg-slate-50">
          <ProfileHeader />
          <Highlights />
          <ProfilePosts />
          <Footer />
        </main>
      </section>
    </>
  );
}

export default Profile;

import { getCurrentUser } from "@/utils/currentUser";
import EditProfileComponent from "./_components/edit-profile";

export default async function EditProfile() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <EditProfileComponent user={user} />
      </div>
    </div>
  );
}

import axios from "axios";
const addUserLeader = async (
  user: UserType,
  faction: FactionType
): Promise<any> => {
  console.log("firing addUserLeader");
  console.log(faction);
  let success;
  try {
    let query = await axios({
      method: "POST",
      url: "/api/addUserLeader",
      data: {
        user,
        faction,
      },
    });
    if (query.status === 200) {
      success = query && query.data && query.data;
    }
  } catch (err) {
    console.log(err);
    success = false;
  }

  return success;
};

export default addUserLeader;

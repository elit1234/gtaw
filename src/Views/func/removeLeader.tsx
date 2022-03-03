import axios from "axios";
const removeLeader = async (id: any): Promise<any> => {
  let success = false;
  if (id) {
    try {
      let query = await axios({
        method: "POST",
        url: "/api/removeLeader",
        data: {
          id,
        },
      });
      if (query.status === 200) success = true;
    } catch (err) {
      console.log(err);
      success = false;
    }
  }
  return success;
};

export default removeLeader;

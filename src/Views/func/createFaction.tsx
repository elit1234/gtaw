import axios from "axios";
const createFaction = async (values: FactionType): Promise<any> => {
  let success;
  if (values) {
    try {
      let query = await axios({
        method: "POST",
        url: "/api/createFaction",
        data: {
          values,
        },
      });
      if (query.status === 200) {
        success = query && query.data && query.data;
      }
    } catch (err) {
      console.log(err);
      success = false;
    }
  }
  return success;
};

export default createFaction;

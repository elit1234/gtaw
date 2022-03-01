import axios from "axios";
const saveFaction = async (values: any): Promise<any> => {
  let success = false;
  if (values) {
    try {
      let query = await axios({
        method: "POST",
        url: "/api/saveFaction",
        data: {
          values,
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

export default saveFaction;

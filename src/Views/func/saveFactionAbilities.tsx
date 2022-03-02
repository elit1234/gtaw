import axios from "axios";
const saveFactionAbilities = async (values: any, id: any): Promise<any> => {
  let success = false;
  if (values) {
    try {
      let query = await axios({
        method: "POST",
        url: "/api/saveFactionAbilities",
        data: {
          values,
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

export default saveFactionAbilities;

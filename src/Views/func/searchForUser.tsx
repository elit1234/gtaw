import axios from "axios";
const searchForUser = async (string: any): Promise<any> => {
  console.log(string);
  if (string) {
    let results: any = [];
    try {
      let query = await axios({
        method: "POST",
        url: "/api/searchForUser",
        data: {
          string,
        },
      });
      console.log(query);
      if (query.data) results = query.data;
    } catch (err) {
      console.log(err);
    }

    return results;
  }
};

export default searchForUser;

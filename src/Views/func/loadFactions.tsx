import axios from "axios";

const loadFactions = async (): Promise<any> => {
  let factions: any = [];
  try {
    let query = await axios({
      method: "GET",
      url: "/api/loadFactions",
    });
    if (query.data) factions = query.data;
  } catch (err) {
    console.log(err);
  }

  if (factions) return factions;
  else return {};
};

export default loadFactions;

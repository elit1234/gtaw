import axios from "axios";
const loadFaction = async (id: any): Promise<any> => {
  if (id) {
    let faction: FactionType = {};
    try {
      let query = await axios({
        method: "POST",
        url: "/api/loadFaction",
        data: {
          id,
        },
      });
      if (query.data) faction = query.data;
    } catch (err) {
      console.log(err);
    }

    if (faction) return faction;
    else return {};
  }
};

export default loadFaction;

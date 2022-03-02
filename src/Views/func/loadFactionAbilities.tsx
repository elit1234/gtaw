import axios from "axios";

const loadFactionAbilities = async (id: any): Promise<any> => {
  let abilities: any = [];
  try {
    let query = await axios({
      method: "POST",
      url: "/api/loadFactionAbilities",
      data: {
        id,
      },
    });
    if (query.data) abilities = query.data;
  } catch (err) {
    console.log(err);
  }

  if (abilities) return abilities;
  else return {};
};

export default loadFactionAbilities;

import axios from "axios";

const loadFactionLeaders = async (id: any): Promise<any> => {
  let leaders: UserType[] = [];
  try {
    let query = await axios({
      method: "POST",
      url: "/api/loadFactionLeaders",
      data: {
        id,
      },
    });
    if (query.data) leaders = query.data;
  } catch (err) {
    console.log(err);
  }

  if (leaders) return leaders;
  else return {};
};

export default loadFactionLeaders;

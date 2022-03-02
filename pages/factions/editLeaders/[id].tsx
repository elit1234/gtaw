import { NextPage } from "next";
import { useRouter } from "next/router";
import EditFactionLeaders from "../../../src/Views/Factions/EditLeaders";
const EditDetailsFunc: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EditFactionLeaders id={id ? id : null} />;
};

export default EditDetailsFunc;

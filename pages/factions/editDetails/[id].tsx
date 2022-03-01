import { NextPage } from "next";
import { useRouter } from "next/router";
import EditFactionDetails from "../../../src/Views/Factions/EditDetails";
const EditDetailsFunc: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EditFactionDetails id={id ? id : null} />;
};

export default EditDetailsFunc;

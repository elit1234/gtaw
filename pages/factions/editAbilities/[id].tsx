import { NextPage } from "next";
import { useRouter } from "next/router";
import EditFactionAbilities from "../../../src/Views/Factions/EditAbilities";
const EditAbilitiesFunc: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <EditFactionAbilities id={id ? id : null} />;
};

export default EditAbilitiesFunc;

import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import loadFaction from "../../func/loadFaction";
import getFactionType from "../../func/getFactionType";
import saveFaction from "../../func/saveFaction";
import styled from "styled-components";
import { useRouter } from "next/router";

const InputsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`;

const InputContainer = styled.div``;

const Placeholder = styled.div`
  padding: 0.5rem 0;
`;

const Input = styled.input`
  height: 3rem;
  width: 20rem;
`;

const Select = styled.select`
  width: 20rem;
  height: 3rem;
`;

const Option = styled.option``;

const Title = styled.div`
  font-size: 25px;
  padding: 2rem 1rem;
`;

const SaveButton = styled.div`
  width: 15rem;
  height: 3rem;
  background: blue;
  cursor: pointer;
  border-radius: 1rem;
  margin: 2rem auto;
  display: grid;
  place-items: center;
  font-weight: bold;
`;

const EditDetails = ({ id }: any) => {
  const router = useRouter();
  const [faction, setFaction] = useState<FactionType>();
  const [values, setValues] = useState<FactionType>({
    name: "",
    type: 0,
  });

  const loadData = async () => {
    const query = await loadFaction(id);
    if (query[0]) {
      setValues({
        id: query[0].id,
        name: query[0].name,
        type: query[0].type,
      });
      return setFaction(query[0]);
    }
  };

  const handleInputChange = (target: string, value: any) => {
    setValues({
      ...values,
      [target]: value,
    });
  };

  const clickedSave = () => {
    if (JSON.stringify(faction) === JSON.stringify(values)) {
      alert("You have not made any changes!");
    } else {
      saveFaction(values);
      router.push("/factions");
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);
  return (
    <Layout>
      <Title>Editing Faction details: {faction && faction.name}</Title>
      <InputsWrapper>
        <InputContainer>
          <Placeholder>Faction Name</Placeholder>
          <Input
            placeholder="Faction Name"
            value={values.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Placeholder>Faction Type</Placeholder>
          <Select
            value={values.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          >
            {Array.from(Array(5), (e, i) => {
              if (i > 0) return <Option value={i}>{getFactionType(i)}</Option>;
            })}
          </Select>
        </InputContainer>
      </InputsWrapper>
      <SaveButton onClick={() => clickedSave()}>Save Faction</SaveButton>
    </Layout>
  );
};

export default EditDetails;

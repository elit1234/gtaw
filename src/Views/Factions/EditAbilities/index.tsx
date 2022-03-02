import { HTMLAttributes, useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import loadFaction from "../../func/loadFaction";
import styled from "styled-components";
import loadFactionAbilities from "../../func/loadFactionAbilities";
import {
  InputContainer,
  InputsWrapper,
  Option,
  Placeholder,
  Select,
} from "../EditDetails";
import saveFactionAbilities from "../../func/saveFactionAbilities";
import { useRouter } from "next/router";

const Title = styled.div`
  font-size: 25px;
  padding: 2rem 1rem;
`;

export const SaveButton = styled.div`
  max-width: 20rem;
  width: 100%;
  height: 3rem;
  background: blue;
  cursor: pointer;
  border-radius: 1rem;
  margin: 2rem auto;
  display: grid;
  place-items: center;
  font-weight: bold;
`;

const EditAbilities = ({ id }: any) => {
  const router = useRouter();
  const [faction, setFaction] = useState<FactionType>();
  const [abilities, setAbilities] = useState();
  const [values, setValues] = useState({
    deptAbility: 0,
    radioAbility: 0,
    arrestAbility: 0,
  });

  const loadData = async () => {
    const query = await loadFaction(id);
    if (query) {
      setAbilities(query);
    }
    const facAbilities = await loadFactionAbilities(id);
    if (facAbilities && facAbilities[0]) {
      setAbilities(facAbilities[0]);
      setValues(facAbilities[0]);
    }
  };

  const handleInputChange = (target: string, value: any) => {
    setValues({
      ...values,
      [target]: Number(value),
    });
  };

  const clickedSave = () => {
    if (JSON.stringify(values) === JSON.stringify(abilities)) {
      alert("You have made no changes!");
    } else {
      console.log("made changes");
      saveFactionAbilities(values, id);
      router.push("/factions");
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);
  return (
    <Layout>
      <Title>Editing Faction abilities: {faction && faction.name}</Title>
      <InputsWrapper>
        <InputContainer>
          <Placeholder>Department Radio</Placeholder>
          <Select
            value={values.deptAbility}
            onChange={(e) => handleInputChange("deptAbility", e.target.value)}
          >
            <Option value={0}>False</Option>
            <Option value={1}>True</Option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Placeholder>Faction Radio</Placeholder>
          <Select
            value={values.radioAbility}
            onChange={(e) => handleInputChange("radioAbility", e.target.value)}
          >
            <Option value={0}>False</Option>
            <Option value={1}>True</Option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Placeholder>Can Arrest</Placeholder>
          <Select
            value={values.arrestAbility}
            onChange={(e) => handleInputChange("arrestAbility", e.target.value)}
          >
            <Option value={0}>False</Option>
            <Option value={1}>True</Option>
          </Select>
        </InputContainer>
      </InputsWrapper>
      <SaveButton onClick={() => clickedSave()}>Save</SaveButton>
    </Layout>
  );
};

export default EditAbilities;

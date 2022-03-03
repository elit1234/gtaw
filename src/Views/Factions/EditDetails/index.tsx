import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import loadFaction from "../../func/loadFaction";
import getFactionType from "../../func/getFactionType";
import saveFaction from "../../func/saveFaction";
import deleteFaction from "../../func/deleteFaction";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 0.5rem;
  padding: 1rem;
  padding-top: 2rem;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 20rem;
  margin: 0 auto;
`;

export const Placeholder = styled.div`
  padding: 0.5rem 0;
`;

export const Input = styled.input`
  height: 3rem;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  height: 3rem;
`;

export const Option = styled.option``;

export const Title = styled.div`
  font-size: 25px;
  padding: 2rem 1rem;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-template-rows: 1fr;

  grid-gap: 0.5rem;
  padding: 1rem;

  justify-content: space-between;
`;

const SaveButton = styled.div`
  width: 100%;
  height: 3rem;
  background: blue;
  cursor: pointer;
  border-radius: 1rem;

  display: grid;
  place-items: center;
  font-weight: bold;
`;

const DeleteButton = styled(SaveButton)`
  background: red;
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

  const clickedSave = async () => {
    if (JSON.stringify(faction) === JSON.stringify(values)) {
      alert("You have not made any changes!");
    } else {
      await saveFaction(values);
      router.push("/factions");
    }
  };

  const clickedDelete = async () => {
    if (faction) {
      const str = `Are you sure you want to delete ${faction.name}? This is not reversable.`;
      if (window.confirm(str)) {
        await deleteFaction(faction.id);
        await router.push("/factions");
      } else {
        console.log("clicked cancel");
      }
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);
  return (
    <Layout>
      <Title>Editing Faction details: {faction && faction.name}</Title>
      <Head>
        <title>{faction && faction.name} - Details</title>
      </Head>
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
              if (i > 0)
                return (
                  <Option value={i} key={i}>
                    {getFactionType(i)}
                  </Option>
                );
            })}
          </Select>
        </InputContainer>
      </InputsWrapper>
      <Buttons>
        <DeleteButton onClick={() => clickedDelete()}>
          Delete Faction
        </DeleteButton>
        <SaveButton onClick={() => clickedSave()}>Save Faction</SaveButton>
      </Buttons>
    </Layout>
  );
};

export default EditDetails;

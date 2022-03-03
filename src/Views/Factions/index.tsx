import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../Components/Layout";
import createFaction from "../func/createFaction";
import getFactionType from "../func/getFactionType";
import loadFactions from "../func/loadFactions";
import {
  Input,
  InputContainer,
  InputsWrapper,
  Option,
  Placeholder,
  Select,
  Title,
} from "./EditDetails";
import { SaveButton } from "./EditLeaders";
import { setFaction, useAppDispatch } from "../../redux/user";
import { useSelector } from "react-redux";

interface ListOptionProps extends HTMLAttributes<HTMLHeadingElement> {
  active?: any;
  theme?: any;
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
`;

const List = styled.div`
  min-width: 200px;
  height: 35rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

const ListOption = styled.div`
  ${(props: ListOptionProps) => `min-height: 4rem;
  background: ${
    props.active
      ? props.theme.colors.activeBackground
      : props.theme.colors.altBackground
  };
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${!props.active && `font-size: 18px`};
  }
  transition: all 0.2s ease-in-out;
  cursor: pointer;`}
`;

const SelectedOptions = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8rem);
  min-height: 20rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0 0 1rem;
  width: 100%;
  gap: 1rem 0;
`;

const SelectedOption = styled.div`
  min-height: 4rem;
  max-width: 350px;
  width: 100%;
  background: ${(props) => props.theme.colors.altBackground};
  margin: 0 auto;
  cursor: pointer;
  border-radius: 1rem;
  display: grid;
  place-items: center;
`;

const SelectedName = styled.div`
  padding: 2rem 0;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
`;
const Svg = styled.svg`
  width: 45px;
  height: 45px;
  fill: #008000;
`;

const Creating = styled.div`
  padding: 1rem;
  width: 100%;
`;

const Factions: NextPage = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [factions, setFactions] = useState<[FactionType]>();
  const [selected, setSelected] = useState<FactionType>();
  const [creating, setCreating] = useState<boolean>(false);

  const [values, setValues] = useState<FactionType>({
    name: "",
    type: 0,
  });

  const loadData = async () => {
    setSelected(undefined);
    const query = await loadFactions();
    return setFactions(query);
  };

  useEffect(() => {
    loadData();
  }, []);

  const clickedSelectOpt = (opt: number) => {
    let url: string = "/factions";
    if (selected && opt) {
      if (opt === 1) url = `${url}/editDetails/${selected.id}`;
      else if (opt === 2) url = `${url}/editLeaders/${selected.id}`;
      else if (opt === 3) url = `${url}/editAbilities/${selected.id}`;
    }
    url && router.push(url);
  };

  const clickedAddNew = () => {
    setCreating(true);
    setSelected(undefined);
  };

  const clickedCreate = async () => {
    const created = await createFaction(values);

    if (created) {
      router.push("/factions/editDetails/" + created);
    }
  };

  const handleInputChange = (target: string, value: any) => {
    setValues({
      ...values,
      [target]: value,
    });
  };

  useEffect(() => {
    const { selectedFaction } = user;
    if (selectedFaction) {
      factions &&
        factions.map((faction) => {
          if (faction.id === selectedFaction.id) return setSelected(faction);
        });
    }
  }, [user, factions]);

  return (
    <Layout>
      <Head>
        <title>Factions </title>
      </Head>
      <Wrapper>
        <List>
          {factions &&
            factions.map((faction: FactionType, key) => {
              return (
                <ListOption
                  active={selected && selected.id === faction.id ? 1 : 0}
                  key={key}
                  onClick={() => {
                    if (selected !== faction) {
                      setSelected(faction);
                      dispatch(setFaction(faction));
                      setCreating(false);
                    }
                  }}
                >
                  {faction.name && faction.name}
                </ListOption>
              );
            })}
          <ListOption onClick={() => clickedAddNew()}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </Svg>
          </ListOption>
        </List>
        {selected && !creating && (
          <SelectedOptions>
            <SelectedName>
              {selected.name} - {getFactionType(selected.type)}
            </SelectedName>
            <SelectedOption onClick={() => clickedSelectOpt(1)}>
              Edit Faction Details
            </SelectedOption>
            <SelectedOption onClick={() => clickedSelectOpt(2)}>
              Edit Faction Leaders
            </SelectedOption>
            <SelectedOption onClick={() => clickedSelectOpt(3)}>
              Edit Faction Abilities
            </SelectedOption>
          </SelectedOptions>
        )}
        {creating && !selected && (
          <Creating>
            <Title>Create Faction</Title>
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
                  <Option value={0} disabled>
                    Please choose
                  </Option>
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
            <SaveButton onClick={() => clickedCreate()}>
              Create Faction
            </SaveButton>
          </Creating>
        )}
      </Wrapper>
    </Layout>
  );
};

export default Factions;

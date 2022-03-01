import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../Components/Layout";
import getFactionType from "../func/getFactionType";
import loadFactions from "../func/loadFactions";

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
const Factions: NextPage = () => {
  const router = useRouter();

  const [factions, setFactions] = useState<[FactionType]>();
  const [selected, setSelected] = useState<FactionType>();

  const [faction, setFaction] = useState<FactionType>();

  const loadData = async () => {
    const query = await loadFactions();
    return setFactions(query);
  };

  useEffect(() => {
    loadData();
  }, []);

  const clickedSelectOpt = (opt: number) => {
    let url: string = "/factions";
    if (selected && opt) {
      if (opt === 1) {
        url = `${url}/editDetails/${selected.id}`;
      } else if (opt === 2) {
        url = `${url}/editLeaders/${selected.id}`;
      } else if (opt === 3) {
        url = `${url}/editAbilities/${selected.id}`;
      }
    }
    url && router.push(url);
  };
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
                  active={selected && selected === faction ? 1 : 0}
                  key={key}
                  onClick={() => {
                    if (selected !== faction) setSelected(faction);
                  }}
                >
                  {faction.name && faction.name}
                </ListOption>
              );
            })}
        </List>
        {selected && (
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
      </Wrapper>
    </Layout>
  );
};

export default Factions;

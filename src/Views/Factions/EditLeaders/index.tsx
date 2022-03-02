import { HTMLAttributes, useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import loadFaction from "../../func/loadFaction";
import saveFaction from "../../func/saveFaction";
import styled from "styled-components";
import { useRouter } from "next/router";
import loadFactionLeaders from "../../func/loadFactionLeaders";
import Head from "next/head";

interface TableRowOptions extends HTMLAttributes<HTMLHeadingElement> {
  title?: keyof JSX.IntrinsicElements;
  theme?: any;
}

const Title = styled.div`
  font-size: 25px;
  padding: 2rem 1rem;
`;

export const SaveButton = styled.div`
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

const Table = styled.div`
  height: 25rem;
  width: 100%;
  overflow-y: auto;
  padding: 0 1rem;
`;

const TableRow = styled.div`
  ${(props: TableRowOptions) => `
  
  transition: background 0.2s ease-in-out;
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: minmax(120px, 1fr) minmax(120px, 1fr);
  background: ${props.theme.colors.lightBackground};
  grid-template-rows: 1fr;
  align-items: center;
    ${
      props.title
        ? `
        margin-bottom: 0.5rem;
        height: 2.5rem;
        font-weight: bold;
    `
        : `
            height: 4rem;
            
            margin-bottom: 0.2rem;
            cursor: pointer;
            &:hover {
                background: ${props.theme.colors.lightActiveBackground};
            }
        `
    }`}
`;

const TableRowItem = styled.div`
  padding: 0 1rem;
`;

const EditLeaders = ({ id }: any) => {
  const router = useRouter();
  const [faction, setFaction] = useState<FactionType>();
  const [leaders, setLeaders] = useState<UserType[]>();
  const [values, setValues] = useState<FactionType>({
    name: "",
    type: 0,
  });

  const loadData = async () => {
    const query = await loadFaction(id);
    if (query) {
      setFaction(query[0]);
    }
    const leaderQuery = await loadFactionLeaders(id);
    if (leaderQuery) {
      return setLeaders(leaderQuery);
    }
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
      <Title>Editing Faction leaders: {faction && faction.name}</Title>
      <Head>
        <title>{faction && faction.name} - Leaders</title>
      </Head>
      <Table>
        <TableRow title={1}>
          <TableRowItem>ID</TableRowItem>
          <TableRowItem>Name</TableRowItem>
        </TableRow>
        {leaders &&
          leaders.map((leader: UserType, key) => {
            return (
              <TableRow key={key}>
                <TableRowItem>{leader.id}</TableRowItem>
                <TableRowItem>{leader.username}</TableRowItem>
              </TableRow>
            );
          })}
        {leaders &&
          leaders.map((leader: UserType, key) => {
            return (
              <TableRow key={key}>
                <TableRowItem>{leader.id}</TableRowItem>
                <TableRowItem>{leader.username}</TableRowItem>
              </TableRow>
            );
          })}
        {!leaders ||
          (leaders.length < 1 && <p>No leaders for this faction.</p>)}
      </Table>
      <SaveButton onClick={() => clickedSave()}>Save Faction</SaveButton>
    </Layout>
  );
};

export default EditLeaders;

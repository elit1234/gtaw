import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Layout from "../../Components/Layout";
import loadFaction from "../../func/loadFaction";
import styled from "styled-components";
import loadFactionLeaders from "../../func/loadFactionLeaders";
import removeLeader from "../../func/removeLeader";
import Head from "next/head";
import { gsap } from "gsap";
import AddWindow from "./AddWindow";

interface TableRowOptions extends HTMLAttributes<HTMLHeadingElement> {
  title?: any;
  theme?: any;
  as?: string;
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
            min-height: 4rem;
            max-height: 100%;
            
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

const TableRowExtend = styled.div.attrs((props) => ({
  className: `tableRowExtend${props.id}`,
}))`
  visibility: hidden;
  max-height: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.lightBackground};

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const TableRowExtendButton = styled.div`
  width: 10rem;
  background: red;
  border-radius: 1rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.2s ease-in-out;
  height: 3rem;
`;

const EditLeaders = ({ id }: any) => {
  const animRef = useRef<any>(null);
  let tl: GSAPTimeline;
  tl = gsap.timeline({ paused: true });
  const [faction, setFaction] = useState<FactionType>();
  const [leaders, setLeaders] = useState<UserType[]>();
  const [droppedItems, setDroppedItems] = useState<any>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const removeFromDroppedItems = (key: any) => {
    const filtered =
      droppedItems && droppedItems.filter((item: any) => item !== key);

    return setDroppedItems(filtered);
  };

  const addToDroppedItems = (key: any) => {
    let items: any = [];
    if (droppedItems)
      droppedItems.map((droppedItem: any) => {
        items.push(droppedItem);
      });

    items.push(key);
    return setDroppedItems(items);
  };

  const isDropped = (key: any) => {
    let found = false;
    if (droppedItems) {
      droppedItems.map((droppedItem: any) => {
        if (droppedItem === key) {
          found = true;
        }
      });
    }
    return found;
  };

  const loadData = async () => {
    const query = await loadFaction(id);
    if (query) {
      setFaction(query[0]);
    }
    const leaderQuery = await loadFactionLeaders(id);
    if (leaderQuery) {
      let localLeaders = [];
      if (leaderQuery.username) localLeaders.push(leaderQuery);
      else localLeaders = leaderQuery;

      return setLeaders(localLeaders);
    }
  };

  const clickedAdd = () => {
    setShowSearch(true);
  };

  const clickedRow = (user: UserType) => {
    const extenderDom = document.querySelector(`.tableRowExtend${user.id}`);

    if (extenderDom) {
      if (!isDropped(user.id)) {
        addToDroppedItems(user.id);
        animRef.current = tl
          .to(extenderDom, {
            marginBottom: "1rem",
            minHeight: "10rem",
            autoAlpha: 1,
          })
          .play();
      } else {
        removeFromDroppedItems(user.id);
        animRef.current = tl
          .to(extenderDom, {
            marginBottom: 0,
            minHeight: 0,
            autoAlpha: 0,
          })
          .play();
      }
    }
  };

  const clickedRemoveUser = async (id: number) => {
    console.log("clicked remove leader id: " + id);
    const query = await removeLeader(id);
    if (query) {
      loadData();
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const reloadLeaders = () => {
    if (id) loadData();
  };
  return (
    <>
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
            leaders[0] &&
            leaders.map((leader: UserType, key: number) => {
              return (
                <div key={key}>
                  <TableRow key={key} onClick={() => clickedRow(leader)}>
                    <TableRowItem>{leader.id}</TableRowItem>
                    <TableRowItem>{leader.username}</TableRowItem>
                  </TableRow>
                  <TableRowExtend id={leader.id}>
                    Remove as leader?
                    <TableRowExtendButton
                      onClick={() => clickedRemoveUser(leader.id)}
                    >
                      Remove
                    </TableRowExtendButton>
                  </TableRowExtend>
                </div>
              );
            })}
          {!leaders ||
            (leaders.length < 1 && <p>No leaders for this faction.</p>)}
        </Table>
        <SaveButton onClick={() => clickedAdd()}>Add Leader</SaveButton>
      </Layout>
      <AddWindow
        show={showSearch}
        setShow={setShowSearch}
        selectedFaction={faction}
        reloadLeaders={reloadLeaders}
      />
    </>
  );
};

export default EditLeaders;

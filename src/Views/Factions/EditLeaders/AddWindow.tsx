import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import searchForUser from "../../func/searchForUser";
import addUserLeader from "../../func/addUserLeader";

const Outer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-height: 500px;
  max-width: 800px;
  background: ${(props) => props.theme.colors.altBackground};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 20px;
  padding-bottom: 2rem;
`;

const Input = styled.input`
  height: 3rem;
  &:focus {
    outline: none;
  }
`;

const Results = styled.div`
  height: 70%;
  margin-bottom: 0;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
`;

const ResultsRow = styled.div`
  min-height: 3.5rem;
  background: ${(props) => props.theme.colors.lightBackground};
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  & svg {
    fill: #fff;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const AddWindow = ({ show, setShow, selectedFaction, reloadLeaders }: any) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const windowAnimRef = useRef<any>(null);
  const outerRef = useRef<any>(null);
  let windowTl: GSAPTimeline;
  windowTl = gsap.timeline({ paused: true });

  const clickedSearch = async () => {
    console.log("searching for: " + query);
    let dbQuery = await searchForUser(query);
    if (dbQuery) setResults(dbQuery);
  };

  const clickedResultRow = async (user: UserType) => {
    console.log(selectedFaction);
    const result = await addUserLeader(user, selectedFaction);
    if (result) reloadLeaders();

    windowAnimRef.current.reverse();
  };

  useEffect(() => {
    windowAnimRef.current = windowTl.fromTo(
      outerRef.current,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      }
    );
  }, []);

  useEffect(() => {
    if (show) windowAnimRef.current.play();
    else windowAnimRef.current.reverse();
  }, [show]);

  return (
    <Outer ref={outerRef}>
      <Wrapper>
        <CloseIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => setShow(false)}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </CloseIcon>
        <Title>Search for user by name or ID</Title>
        <Input
          placeholder="Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && clickedSearch()}
        />
        <Results>
          Results:
          {results &&
            results.map((result: UserType, key) => {
              return (
                <ResultsRow key={key} onClick={() => clickedResultRow(result)}>
                  {result.username && result.username}
                </ResultsRow>
              );
            })}
          <pre>{JSON.stringify(results, null, 4)}</pre>
        </Results>
      </Wrapper>
    </Outer>
  );
};

export default AddWindow;

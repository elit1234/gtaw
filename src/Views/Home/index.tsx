import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Layout from "../Components/Layout";

const Wrapper = styled.div`
  min-height: 200vh;
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Head>
          <title>GTA W - UCP</title>
        </Head>
        Home
      </Wrapper>
    </Layout>
  );
};

export default Home;

import type { NextPage } from "next";
import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import SideBar from "../SideBar";

interface ContentProps extends HTMLAttributes<HTMLHeadingElement> {
  shrink?: any;
  theme?: any;
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Content = styled.div`
  ${(props: ContentProps) => `
  ${props.shrink ? `padding: 5rem 0 0 100px` : `padding: 5rem 0 0 250px;`}
  `}
`;

const TopBar = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  background: rgb(87, 69, 119);
  background: linear-gradient(
    130deg,
    rgba(87, 69, 119, 1) 0%,
    rgba(20, 26, 26, 1) 100%
  );
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const Layout: NextPage = (props: any) => {
  const { children } = props;
  const [shrink, setShrink] = useState<any>(false);

  return (
    <Wrapper>
      <TopBar>
        <Logo>GTA W</Logo>
      </TopBar>
      <SideBar shrink={shrink} setShrink={setShrink} />
      <Content shrink={shrink ? 1 : 0}>{children && children}</Content>
    </Wrapper>
  );
};

export default Layout;

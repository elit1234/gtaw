import { HTMLAttributes, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

interface OptionProps extends HTMLAttributes<HTMLHeadingElement> {
  active?: any;
  theme?: any;
  shrink?: any;
}

interface WrapperProps extends HTMLAttributes<HTMLHeadingElement> {
  shrink?: any;
  theme?: any;
}

interface IconProps extends HTMLAttributes<HTMLHeadingElement> {
  shrink?: any;
  theme?: any;
}

const Wrapper = styled.div`
  ${(props: WrapperProps) => `position: fixed;
  left: 0;
  top: 5rem;
  height: 100vh;
  width: ${props.shrink ? `100px` : `250px`};
  overflow-y: scroll;`}
  transition: width 0.3s ease-in-out;
`;

const TopOption = styled.div`
  ${(props: IconProps) => `
  height: 2rem;
  display: flex;
  justify-content: ${props.shrink ? `center` : `flex-end`};
  padding: ${props.shrink ? `1rem 0 3rem 0` : `0 1rem 0 0`};
  & svg {
    height: 28px;
    width: 28px;
    cursor: pointer;
  }`}
`;

const IconWrapper = styled.div`
  ${(props: IconProps) => `
  ${
    props.shrink &&
    `
    margin: 0 auto;
  `
  }
  `}
`;

const OptionOuter = styled.div``;
const Option = styled.div`
  ${(props: OptionProps) => `
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 12px;
  color: ${props.theme.colors.altText};
  gap: 0 1rem;
  &:hover {
    background: ${props.theme.colors.altBackground};
    padding: 0 0.3rem;
    color: ${props.theme.colors.text};
  }
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  ${
    props.active &&
    `
    background: ${props.theme.colors.altBackground};
    `
  }

  ${
    props.shrink &&
    `
    background: red;
  `
  }
  `};
`;

const Svg = styled.svg`
  fill: ${(props) => props.theme.colors.altText};
  width: 24px;
  height: 24px;
`;

const DropOption = styled.div.attrs((props: any) => ({
  className: props.addClass ? props.addClass : "",
}))`
  height: 0;
  visibility: hidden;
`;

const DropOptionOption = styled.div`
  padding-left: 3rem;
`;

const OptionArrow = styled.div`
  margin-left: auto;
  margin-right: 0;
`;

const SideBar = ({ shrink, setShrink }: any) => {
  const animRef = useRef<any>(null);
  let tl: GSAPTimeline;
  tl = gsap.timeline({ paused: true });

  const [droppedItems, setDroppedItems] = useState<any>([]);

  /*

const exItems = state.items ? state.items : [];
      const filtered =
        exItems &&
        exItems.filter((item: ItemType) => item.id !== action.payload.id);
      return {
        items: filtered,
      };

      */

  const removeFromDroppedItems = (key: any) => {
    const filtered =
      droppedItems && droppedItems.filter((item: any) => item !== key);
    console.log(droppedItems);

    console.log("filtered:");
    console.log(filtered);
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
    console.log(found);
    return found;
  };

  const options = [
    {
      name: "Home",
      icon: (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </Svg>
      ),
      dropOptions: [
        {
          name: "Dashboard",
        },
        {
          name: "Bob Marley",
        },
        {
          name: "Joe Bloggs",
        },
        {
          name: "Joe Rogan",
        },
      ],
    },
    {
      name: "Characters",
      icon: (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </Svg>
      ),
    },
    {
      name: "Factions",
      icon: (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
        </Svg>
      ),
    },
  ];

  const clickedOption = (opt: any, key: any) => {
    if (opt.dropOptions) {
      const foundDrop = document.querySelector(`.dropOption${key}`);
      if (foundDrop) {
        if (!isDropped(key)) {
          addToDroppedItems(key);
          animRef.current = tl
            .fromTo(
              foundDrop,
              {
                autoAlpha: 0,
              },
              {
                autoAlpha: 1,
                height: "100%",
                padding: "1rem 0",
                ease: "Power1.inOut",
              }
            )
            .play();
        } else {
          removeFromDroppedItems(key);
          animRef.current = tl
            .fromTo(
              foundDrop,
              {
                scaleY: 1,
                height: "100%",
              },
              {
                autoAlpha: 0,
                height: 0,
                ease: "Power1.inOut",
                duration: 0.3,
                padding: 0,
              }
            )
            .play();
        }
      }
    }
  };

  return (
    <Wrapper shrink={shrink ? 1 : 0}>
      <TopOption shrink={shrink ? 1 : 0}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={() => setShrink(!shrink)}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </Svg>
      </TopOption>
      {options &&
        options.map((opt, key) => {
          return (
            <OptionOuter
              key={key}
              onClick={() => {
                clickedOption(opt, key);
              }}
            >
              <Option>
                <IconWrapper shrink={shrink ? 1 : 0}>
                  {opt.icon && opt.icon}
                </IconWrapper>{" "}
                {!shrink && opt.name && opt.name}
                {opt.dropOptions && !shrink && (
                  <OptionArrow>
                    {isDropped(key) ? (
                      <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                      </Svg>
                    ) : (
                      <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                      </Svg>
                    )}
                  </OptionArrow>
                )}
              </Option>
              {opt.dropOptions && !shrink && (
                <DropOption addClass={`dropOption${key}`}>
                  {opt.dropOptions.map((dropOpt, dropKey) => {
                    return (
                      <DropOptionOption key={dropKey}>
                        {dropOpt.name && dropOpt.name}
                      </DropOptionOption>
                    );
                  })}
                </DropOption>
              )}
            </OptionOuter>
          );
        })}
    </Wrapper>
  );
};

export default SideBar;

import styled from "styled-components";
import { useState, createContext } from "react";
import Card from "../Card";
import { QUERIES } from "../constants";

const Wrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  position: relative;
  background-color: var(--color-magnolia);
  overflow: hidden;

  @media ${QUERIES.tabletAndSmaller} {
    display: flex;
    justify-content: center;
  }
`;

const MobileBackgroundContainer = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 375px;
  height: 172px;
  min-width: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    display: block;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

export const MainContext = createContext();

function MainBody() {
  const [activeCard, setActiveCard] = useState(0);
  const [data, setData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
    },
    plan: {
      selected: "arcade",
      type: "yearly",
    },
    addons: {
      online_service: false,
      larger_storage: false,
      custom_profile: false,
    },
  });

  return (
    <Wrapper role={"main"}>
      <MobileBackgroundContainer>
        <Image
          src={"/frontendmentor_16/bg-sidebar-mobile.svg"}
          alt={"card background image"}
        />
      </MobileBackgroundContainer>
      <MainContext.Provider
        value={{ data, setData, activeCard, setActiveCard }}
      >
        <Card />
      </MainContext.Provider>
    </Wrapper>
  );
}

export default MainBody;

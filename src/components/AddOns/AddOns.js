import styled, { css } from "styled-components";
import { Wrapper, Container, TextWrapper, Title, Desc } from "../PersonalInfo";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import Button from "../Button";
import {
  BottomButtonRow,
  GoBackButton,
  MyMobileBottomRow,
} from "../SelectPlan";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const MyContainer = styled(Container)`
  max-width: 100%;
`;

const AddonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media ${QUERIES.tabletAndSmaller} {
    align-items: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    align-items: start;
  }
`;

const AddonContainer = styled.div`
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  background-color: ${(p) =>
    p.active ? "var(--color-custom-gray)" : "var(--color-white)"};
  padding: 18px 26px;
  display: flex;
  gap: 20px;
  align-items: center;
  border: 1px solid
    ${(p) =>
      p.active ? "var(--color-purple-blue)" : "var(--color-light-gray)"};
  cursor: pointer;
  width: 450px;
  outline-color: var(--color-marine-blue);

  ${hoverSupported(css`
    &:hover {
      border-color: var(--color-purple-blue);
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
  }
`;

const AddonCheckbox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  display: grid;
  place-content: center;
  padding: 4px 2px;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  background-color: ${(p) =>
    p.active ? "var(--color-purple-blue)" : "var(--color-white)"};
  border: 1px solid
    ${(p) =>
      p.active ? "var(--color-purple-blue)" : "var(--color-light-gray)"};
`;

const CheckboxContainer = styled.div`
  margin-top: -12px;
  width: 12px;
  height: 9px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const AddonInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const AddonTitle = styled.span`
  font-size: ${16 / 16}rem;
  color: var(--color-marine-blue);
  font-weight: var(--font-weight-bold);
`;

const AddonDesc = styled.span`
  font-size: ${14 / 16}rem;
  color: var(--color-cool-gray);
`;

const AddonPrice = styled.span`
  margin-left: auto;
  font-size: ${14 / 16}rem;
  color: var(--color-purple-blue);
`;

const AddonsMobileBottomRow = styled(MyMobileBottomRow)`
  bottom: -130px;
  align-items: center;
`;

function AddOns() {
  const { data, setData, setActiveCard } = useContext(MainContext);

  return (
    <>
      <Wrapper>
        <MyContainer>
          <TextWrapper>
            <Title>Pick add-ons</Title>
            <Desc>Add-ons help enhance your gaming experience.</Desc>
          </TextWrapper>

          <AddonsWrapper>
            <ClickableWrapper
              active={data.addons.online_service}
              onClick={() => {
                const tmp = { ...data };
                tmp.addons.online_service = !tmp.addons.online_service;
                setData(tmp);
              }}
            >
              <AddonContainer>
                <AddonCheckbox active={data.addons.online_service}>
                  <CheckboxContainer>
                    <Image
                      src={"/frontendmentor_16/icon-checkmark.svg"}
                      alt={"checkmark icon image"}
                    />
                  </CheckboxContainer>
                </AddonCheckbox>

                <AddonInfoWrapper>
                  <AddonTitle>Online service</AddonTitle>
                  <AddonDesc>Access to multiplayer games</AddonDesc>
                </AddonInfoWrapper>

                <AddonPrice>
                  {data.plan.type === "monthly" ? "+$1/mo" : "+$10/yr"}
                </AddonPrice>
              </AddonContainer>
            </ClickableWrapper>

            <ClickableWrapper
              active={data.addons.larger_storage}
              onClick={() => {
                const tmp = { ...data };
                tmp.addons.larger_storage = !tmp.addons.larger_storage;
                setData(tmp);
              }}
            >
              <AddonContainer>
                <AddonCheckbox active={data.addons.larger_storage}>
                  <CheckboxContainer>
                    <Image
                      src={"/frontendmentor_16/icon-checkmark.svg"}
                      alt={"checkmark icon image"}
                    />
                  </CheckboxContainer>
                </AddonCheckbox>

                <AddonInfoWrapper>
                  <AddonTitle>Larger storage</AddonTitle>
                  <AddonDesc>Extra 1TB of cloud save</AddonDesc>
                </AddonInfoWrapper>

                <AddonPrice>
                  {data.plan.type === "monthly" ? "+$2/mo" : "+$20/yr"}
                </AddonPrice>
              </AddonContainer>
            </ClickableWrapper>

            <ClickableWrapper
              active={data.addons.custom_profile}
              onClick={() => {
                const tmp = { ...data };
                tmp.addons.custom_profile = !tmp.addons.custom_profile;
                setData(tmp);
              }}
            >
              <AddonContainer>
                <AddonCheckbox active={data.addons.custom_profile}>
                  <CheckboxContainer>
                    <Image
                      src={"/frontendmentor_16/icon-checkmark.svg"}
                      alt={"checkmark icon image"}
                    />
                  </CheckboxContainer>
                </AddonCheckbox>

                <AddonInfoWrapper>
                  <AddonTitle>Customizable profile</AddonTitle>
                  <AddonDesc>Custom theme on your profile</AddonDesc>
                </AddonInfoWrapper>

                <AddonPrice>
                  {data.plan.type === "monthly" ? "+$2/mo" : "+$20/yr"}
                </AddonPrice>
              </AddonContainer>
            </ClickableWrapper>
          </AddonsWrapper>

          <BottomButtonRow>
            <ClickableWrapper
              onClick={() => {
                setActiveCard(1);
              }}
            >
              <GoBackButton>Go Back</GoBackButton>
            </ClickableWrapper>
            <Button
              onClick={() => {
                setActiveCard(3);
              }}
            >
              Next Step
            </Button>
          </BottomButtonRow>
        </MyContainer>
      </Wrapper>
      <AddonsMobileBottomRow type={data.plan.type}>
        <ClickableWrapper
          onClick={() => {
            setActiveCard(1);
          }}
        >
          <GoBackButton>Go Back</GoBackButton>
        </ClickableWrapper>
        <Button
          onClick={() => {
            setActiveCard(3);
          }}
        >
          Next Step
        </Button>
      </AddonsMobileBottomRow>
    </>
  );
}

export default AddOns;

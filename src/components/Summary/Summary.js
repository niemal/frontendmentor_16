import styled, { css } from "styled-components";
import { Wrapper, Container, TextWrapper, Title, Desc } from "../PersonalInfo";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../MainBody";
import Button from "../Button";
import {
  BottomButtonRow,
  GoBackButtonComponent,
  MyMobileBottomRow,
} from "../SelectPlan";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";

const MyContainer = styled(Container)`
  max-width: 100%;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-magnolia);
  border-radius: 8px;
  width: 450px;
  padding: 24px;

  @media ${QUERIES.tabletAndSmaller} {
    margin: 0 auto;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;

  ${(p) =>
    p.total
      ? `
  padding: 0px 24px;
  margin-top: -12px;
  `
      : ""}

  @media ${QUERIES.phoneAndSmaller} {
    ${(p) =>
      p.total
        ? `
  margin-top: 8px;
  `
        : ""}
  }
`;

const PlanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;

const PlanName = styled.span`
  font-size: ${16 / 16}rem;
  color: var(--color-marine-blue);
  font-weight: var(--font-weight-medium);
`;

const ChangePlan = styled.div`
  color: var(--color-cool-gray);
  text-decoration: underline;
  font-size: ${14 / 16}rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: max-content;
  outline-color: var(--color-purple-blue);

  ${hoverSupported(css`
    &:hover {
      color: var(--color-purple-blue);
    }
  `)}
`;

const ChangePlanComponent = ({ children, onClick, ...props }) => {
  return (
    <ChangePlan
      tabIndex={"0"}
      role={"button"}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();

          if (onClick) {
            onClick(event);
          }
        }
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </ChangePlan>
  );
};

const PriceEntry = styled.span`
  color: var(--color-marine-blue);
  font-size: ${(p) => (!p.first ? `${14 / 16}rem` : `${16 / 16}rem`)};
  font-weight: ${(p) =>
    p.first || p.total
      ? "var(--font-weight-bold)"
      : "var(--font-weight-medium)"};

  ${(p) =>
    p.total
      ? `
    font-size: ${22 / 16}rem;
    color: var(--color-purple-blue);
  `
      : ""}

  ${(p) => (p.first ? `margin-top: 8px;` : "")}
  ${(p) => (p.total ? `margin-top: -8px;` : "")}
`;

const AddOnsWrapper = styled.div`
  border-top: 1px solid var(--color-light-gray);
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
`;

const AddonName = styled.span`
  color: var(--color-cool-gray);
  font-size: ${14 / 16}rem;
`;

const dataSummary = {
  arcade: {
    name: "Arcade",
    monthly: 9,
    yearly: 90,
  },
  advanced: {
    name: "Advanced",
    monthly: 12,
    yearly: 120,
  },
  pro: {
    name: "Pro",
    monthly: 15,
    yearly: 150,
  },
  addons: {
    monthly: {
      online_service: 1,
      larger_storage: 2,
      custom_profile: 2,
    },
    yearly: {
      online_service: 10,
      larger_storage: 20,
      custom_profile: 20,
    },
  },
};

const SummaryMobileBottomRow = styled(MyMobileBottomRow)`
  bottom: -238px;
  align-items: center;
`;

function Summary() {
  const [total, setTotal] = useState("");
  const { data, setActiveCard } = useContext(MainContext);

  useEffect(() => {
    let tmp = dataSummary[data.plan.selected][data.plan.type];

    if (data.addons.online_service) {
      tmp += dataSummary.addons[data.plan.type].online_service;
    }

    if (data.addons.larger_storage) {
      tmp += dataSummary.addons[data.plan.type].larger_storage;
    }

    if (data.addons.custom_profile) {
      tmp += dataSummary.addons[data.plan.type].custom_profile;
    }

    setTotal(tmp);
  }, [data]);

  return (
    <>
      <Wrapper>
        <MyContainer>
          <TextWrapper>
            <Title>Finishing up</Title>
            <Desc>Double-check everything looks OK before confirming.</Desc>
          </TextWrapper>

          <DetailsWrapper>
            <Row>
              <PlanWrapper>
                <PlanName>{`${dataSummary[data.plan.selected].name} (${
                  data.plan.type === "yearly" ? "Yearly" : "Monthly"
                })`}</PlanName>
                <ChangePlanComponent
                  onClick={() => {
                    setActiveCard(1);
                  }}
                >
                  Change
                </ChangePlanComponent>
              </PlanWrapper>

              <PriceEntry first={true}>{`\$${
                dataSummary[data.plan.selected][data.plan.type]
              }/${data.plan.type === "yearly" ? "yr" : "mo"}`}</PriceEntry>
            </Row>
            <AddOnsWrapper>
              {data.addons.online_service ? (
                <Row>
                  <AddonName>Online service</AddonName>
                  <PriceEntry>{`+\$${
                    dataSummary.addons[data.plan.type].online_service
                  }/${data.plan.type === "yearly" ? "yr" : "mo"}`}</PriceEntry>
                </Row>
              ) : (
                ""
              )}

              {data.addons.larger_storage ? (
                <Row>
                  <AddonName>Larger storage</AddonName>
                  <PriceEntry>{`+\$${
                    dataSummary.addons[data.plan.type].larger_storage
                  }/${data.plan.type === "yearly" ? "yr" : "mo"}`}</PriceEntry>
                </Row>
              ) : (
                ""
              )}

              {data.addons.custom_profile ? (
                <Row>
                  <AddonName>Customizable profile</AddonName>
                  <PriceEntry>{`+\$${
                    dataSummary.addons[data.plan.type].custom_profile
                  }/${data.plan.type === "yearly" ? "yr" : "mo"}`}</PriceEntry>
                </Row>
              ) : (
                ""
              )}
            </AddOnsWrapper>
          </DetailsWrapper>

          <Row total={true}>
            <AddonName>{`Total (per month)`}</AddonName>
            <PriceEntry total={true}>{`+\$${total}/${
              data.plan.type === "yearly" ? "yr" : "mo"
            }`}</PriceEntry>
          </Row>

          <BottomButtonRow>
            <GoBackButtonComponent
              onClick={() => {
                setActiveCard(2);
              }}
            >
              Go Back
            </GoBackButtonComponent>
            <Button
              confirm={true}
              onClick={() => {
                setActiveCard(4);
              }}
            >
              Confirm
            </Button>
          </BottomButtonRow>
        </MyContainer>
      </Wrapper>
      <SummaryMobileBottomRow type={data.plan.type}>
        <GoBackButtonComponent
          onClick={() => {
            setActiveCard(2);
          }}
        >
          Go Back
        </GoBackButtonComponent>
        <Button
          onClick={() => {
            setActiveCard(4);
          }}
        >
          Next Step
        </Button>
      </SummaryMobileBottomRow>
    </>
  );
}

export default Summary;

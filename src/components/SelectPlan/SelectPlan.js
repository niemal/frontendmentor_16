import styled, { css } from "styled-components";
import {
  Wrapper,
  Container,
  TextWrapper,
  Title,
  Desc,
  MobileBottomRow,
} from "../PersonalInfo";
import { useContext } from "react";
import { MainContext } from "../MainBody";
import Button from "../Button";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const plans = {
  arcade: {
    image: "/frontendmentor_16/icon-arcade.svg",
    title: "Arcade",
    priceMonthly: "$9/mo",
    priceYearly: "$90/yr",
  },
  advanced: {
    image: "/frontendmentor_16/icon-advanced.svg",
    title: "Advanced",
    priceMonthly: "$12/mo",
    priceYearly: "$120/yr",
  },
  pro: {
    image: "/frontendmentor_16/icon-pro.svg",
    title: "Pro",
    priceMonthly: "$15/mo",
    priceYearly: "$150/yr",
  },
};

const MyContainer = styled(Container)`
  max-width: 100%;
`;

const PlansWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media ${QUERIES.tabletAndSmaller} {
    justify-content: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
  }
`;

const PlanCard = styled.div`
  transition: all 0.3s ease-in-out;
  background-color: ${(p) =>
    p.active ? "var(--color-custom-gray)" : "var(--color-white)"};
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.type === "monthly" ? "0px" : "4px")};
  padding: 12px;
  padding-left: ${(p) => (p.type === "monthly" ? "12px" : "16px")};
  padding-top: 24px;
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p.active ? "var(--color-purple-blue)" : "var(--color-light-gray);"};
  cursor: pointer;
  width: 140px;
  min-height: ${(p) => (p.type === "monthly" ? "160px" : "184px")};
  outline-color: var(--color-marine-blue);

  ${hoverSupported(css`
    &:hover {
      border-color: var(--color-purple-blue);
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding-top: 12px;
    min-height: 100%;
  }
`;

const CardInfoWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.type === "monthly" ? "0px" : "4px")};

  @media ${QUERIES.phoneAndSmaller} {
    margin-top: 0;
  }
`;

const PlanImageContainer = styled.div`
  width: 40px;
  height: 40px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const PlanTitle = styled.h2`
  color: var(--color-marine-blue);
  font-weight: var(--font-weight-bold);
`;

const PlanPrice = styled.span`
  font-size: ${14 / 16}rem;
  color: var(--color-cool-gray);
`;

const FreeMonths = styled.span`
  font-size: ${12 / 16}rem;
  color: var(--color-marine-blue);
`;

const TypeContainer = styled.div`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  background-color: var(--color-custom-gray);
  gap: 28px;
`;

const TypeName = styled.span`
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-medium);
  transition: all 0.3s ease-in-out;
  color: ${(p) =>
    p.active ? "var(--color-marine-blue)" : "var(--color-cool-gray)"};
  cursor: pointer;
`;

const OptionContainer = styled.div`
  position: relative;
  height: 22px;
  width: 40px;
  padding: 4px;
  background-color: var(--color-marine-blue);
  border-radius: 5000px;
  cursor: pointer;
  outline-color: var(--color-purple-blue);
`;

const OptionBall = styled.div`
  width: 13px;
  height: 13px;
  position: absolute;
  border-radius: 50%;
  background-color: var(--color-white);
  left: 4px;
  top: 4px;

  transition: all 0.3s ease-in-out;
  ${(p) => (p.right ? "transform: translateX(19px);" : "")}
`;

export const BottomButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

export const GoBackButton = styled.div`
  font-weight: var(--font-weight-bold);
  color: var(--color-cool-gray);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  outline-color: var(--color-purple-blue);

  ${hoverSupported(css`
    &:hover {
      color: var(--color-marine-blue);
    }
  `)}
`;

export const MyMobileBottomRow = styled(MobileBottomRow)`
  justify-content: space-between;
  align-items: center;
  bottom: ${(p) => (p.type === "yearly" ? "-100px" : "-165px")};
`;

function SelectPlan() {
  const { data, setData, setActiveCard } = useContext(MainContext);

  return (
    <>
      <Wrapper>
        <MyContainer>
          <TextWrapper>
            <Title>Select your plan</Title>
            <Desc>You have the option of monthly or yearly billing.</Desc>
          </TextWrapper>

          <PlansWrapper>
            {Object.keys(plans).map((plan, idx) => (
              <ClickableWrapper
                key={`plan-${idx + 1}`}
                type={data.plan.type}
                active={data.plan.selected === plan}
                onClick={() => {
                  if (data.plan.selected !== plan) {
                    const tmp = { ...data };
                    tmp.plan.selected = plan;
                    setData(tmp);
                  }
                }}
              >
                <PlanCard>
                  <PlanImageContainer>
                    <Image
                      src={plans[plan].image}
                      alt={`${plans[plan].title} icon image`}
                    />
                  </PlanImageContainer>
                  <CardInfoWrapper>
                    <PlanTitle>{plans[plan].title}</PlanTitle>
                    <PlanPrice>
                      {data.plan.type === "yearly"
                        ? plans[plan].priceYearly
                        : plans[plan].priceMonthly}
                    </PlanPrice>
                    {data.plan.type === "yearly" ? (
                      <FreeMonths>2 months free</FreeMonths>
                    ) : (
                      ""
                    )}
                  </CardInfoWrapper>
                </PlanCard>
              </ClickableWrapper>
            ))}
          </PlansWrapper>

          <TypeContainer>
            <TypeName
              active={data.plan.type === "monthly"}
              onClick={() => {
                if (data.plan.type !== "monthly") {
                  const tmp = { ...data };
                  tmp.plan.type = "monthly";
                  setData(tmp);
                }
              }}
            >
              Monthly
            </TypeName>
            <ClickableWrapper
              onClick={() => {
                const tmp = { ...data };
                if (data.plan.type === "monthly") {
                  tmp.plan.type = "yearly";
                } else {
                  tmp.plan.type = "monthly";
                }
                setData(tmp);
              }}
            >
              <OptionContainer>
                <OptionBall right={data.plan.type === "yearly"} />
              </OptionContainer>
            </ClickableWrapper>
            <TypeName
              active={data.plan.type === "yearly"}
              onClick={() => {
                if (data.plan.type !== "yearly") {
                  const tmp = { ...data };
                  tmp.plan.type = "yearly";
                  setData(tmp);
                }
              }}
            >
              Yearly
            </TypeName>
          </TypeContainer>

          <BottomButtonRow>
            <ClickableWrapper
              onClick={() => {
                setActiveCard(0);
              }}
            >
              <GoBackButton>Go Back</GoBackButton>
            </ClickableWrapper>
            <Button
              lastTabIndex={plans.length - 1}
              onClick={() => {
                setActiveCard(2);
              }}
            >
              Next Step
            </Button>
          </BottomButtonRow>
        </MyContainer>
      </Wrapper>

      <MyMobileBottomRow type={data.plan.type}>
        <ClickableWrapper
          onClick={() => {
            setActiveCard(0);
          }}
        >
          <GoBackButton>Go Back</GoBackButton>
        </ClickableWrapper>
        <Button
          onClick={() => {
            setActiveCard(2);
          }}
        >
          Next Step
        </Button>
      </MyMobileBottomRow>
    </>
  );
}

export default SelectPlan;

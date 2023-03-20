import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { useContext } from "react";
import { MainContext } from "../MainBody/MainBody";
import PersonalInfo from "../PersonalInfo";
import SelectPlan from "../SelectPlan";
import AddOns from "../AddOns";
import Summary from "../Summary";
import ThankYou from "../ThankYou";
import { AnimatePresence, motion } from "framer-motion";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background-color: var(--color-white);
  width: 100%;
  max-width: 1100px;
  gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    position: relative;
    margin-top: 100px;
    width: calc(100% - 32px);
    padding: 0px;
    align-items: start;
    height: max-content;
  }
`;

const MobileStepPanel = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: flex;
    position: absolute;
    top: 28px;
    gap: 16px;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
`;

const LeftPanelWrapper = styled.div`
  position: relative;
  min-width: 274px;
  min-height: 568px;

  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const LeftPanelBackgroundContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

const LeftPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 40px 32px;
  position: relative;
  z-index: 4;
  user-select: none;
`;

const StepDisplayWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: end;
`;

const StepNumber = styled.span`
  padding: 4px 11px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border: 1px solid ${(p) => (p.active ? "transparent" : "var(--color-white)")};
  background-color: ${(p) =>
    p.active ? "var(--color-light-blue)" : "transparent"};
  color: ${(p) =>
    p.active ? "var(--color-marine-blue)" : "var(--color-white)"};
`;

const StepDetailsWrapper = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StepWhich = styled.span`
  font-size: ${12 / 16}rem;
  color: var(--color-pastel-blue);
  margin-bottom: -4px;
`;

const StepDesc = styled.span`
  font-size: ${15 / 16}rem;
  color: var(--color-alabaster);
  font-weight: var(--font-weight-bold);
`;

const MotionWrapper = styled(motion.div)`
  width: 100%;
`;

const animationVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const cards = [
  { key: "YOUR INFO", comp: <PersonalInfo key={"view"} /> },
  { key: "SELECT PLAN", comp: <SelectPlan key={"view"} /> },
  { key: "ADD-ONS", comp: <AddOns key={"view"} /> },
  { key: "SUMMARY", comp: <Summary key={"view"} /> },
  { key: "THANK YOU", comp: <ThankYou key={"view"} /> },
];

function Card() {
  const { activeCard } = useContext(MainContext);

  return (
    <>
      <MobileStepPanel>
        {cards.map(
          (_, idx) =>
            idx < cards.length - 1 && (
              <StepNumber
                key={`mobile-card-number-${idx}`}
                active={activeCard === idx || (activeCard === 4 && idx === 3)}
              >
                {idx + 1}
              </StepNumber>
            )
        )}
      </MobileStepPanel>
      <Wrapper>
        <LeftPanelWrapper>
          <LeftPanelContainer>
            {cards.map(
              (item, idx) =>
                idx < cards.length - 1 && (
                  <StepDisplayWrapper key={`card-item-${idx + 1}`}>
                    <StepNumber
                      active={
                        activeCard === idx || (activeCard === 4 && idx === 3)
                      }
                    >
                      {idx + 1}
                    </StepNumber>
                    <StepDetailsWrapper>
                      <StepWhich>STEP {idx + 1}</StepWhich>
                      <StepDesc>{item.key}</StepDesc>
                    </StepDetailsWrapper>
                  </StepDisplayWrapper>
                )
            )}
          </LeftPanelContainer>

          <LeftPanelBackgroundContainer>
            <Image
              src={
                isMobile
                  ? "/frontendmentor_16/bg-sidebar-mobile.svg"
                  : "/frontendmentor_16/bg-sidebar-desktop.svg"
              }
              alt={"panel background image"}
            />
          </LeftPanelBackgroundContainer>
        </LeftPanelWrapper>

        <AnimatePresence mode={"wait"}>
          {cards.map((item, idx) => {
            if (idx === activeCard) {
              return (
                <MotionWrapper
                  key={`motion-wrapper-${idx}`}
                  variants={animationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {item.comp}
                </MotionWrapper>
              );
            } else {
              return null;
            }
          })}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Card;

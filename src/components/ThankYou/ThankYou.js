import { Wrapper } from "../PersonalInfo";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ThankYouWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  max-width: 100%;
  width: 450px;
  min-height: 100%;
  margin-top: -16px;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-top: 16px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const TextWrapper = styled(ThankYouWrapper)`
  gap: 16px;
  margin-top: 0px;
`;

const TextWrapperMotion = motion(TextWrapper);

const Title = styled.h1`
  font-size: ${32 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-marine-blue);
`;

const Desc = styled.span`
  color: var(--color-cool-gray);
  text-align: center;
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  rotate: ${({ rotate }) => rotate}deg;
`;

// const confettiColors = ["#FFC700", "#FF4A08", "#8F00FF", "#00C9FF"];
const confettiColors = ["#0a193a", "#4c4cff", "#d12847", "#3f3fff"];

const generateRandomConfetti = (count, side) => {
  return Array.from({ length: count }, (_, i) => {
    const x =
      side === "left"
        ? Math.random() * (window.innerWidth * 0.5)
        : Math.random() * (window.innerWidth * 0.5) + window.innerWidth * 0.5;
    return {
      id: `confetti-${side}-${i}`,
      x,
      y: Math.random() * window.innerHeight * 0.5 - window.innerHeight * 0.25,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    };
  });
};

const confettiAnimationVariants = {
  hidden: {
    y: -10,
    opacity: 0,
    scale: 0,
  },
  visible: (custom) => ({
    y: [custom.y, custom.y + 200, custom.y + 300],
    x: [custom.x, custom.x + (Math.random() < 0.5 ? -100 : 100), custom.x],
    opacity: [1, 1, 0],
    scale: [0, 1, 1],
    rotate: [0, 360],
    transition: {
      duration: 2,
      ease: "anticipate",
      times: [0, 1],
      loop: Infinity,
      delay: Math.random(),
    },
  }),
};

const textWrapperAnimationVariants = {
  rotate: {
    rotate: [0, -3, 3, -3, 3, -3, 3, 0],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      yoyo: Infinity,
    },
  },
};

function ThankYou() {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const leftConfetti = generateRandomConfetti(120, "left");
    const rightConfetti = generateRandomConfetti(120, "right");
    setConfettiPieces([...leftConfetti, ...rightConfetti]);
  }, []);

  return (
    <Wrapper>
      {/* Confetti animation */}
      {confettiPieces.map((piece) => (
        <Confetti
          key={piece.id}
          initial="hidden"
          animate="visible"
          custom={piece}
          color={piece.color}
          rotate={Math.random() * 360}
          variants={confettiAnimationVariants}
        />
      ))}
      <ThankYouWrapper>
        <ImageContainer>
          <Image
            src={"/frontendmentor_16/icon-thank-you.svg"}
            alt={"thank you image"}
          />
        </ImageContainer>

        <TextWrapperMotion
          animate={"rotate"}
          variants={textWrapperAnimationVariants}
        >
          <Title>Thank you!</Title>
          <Desc>
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </Desc>
        </TextWrapperMotion>
      </ThankYouWrapper>
    </Wrapper>
  );
}

export default ThankYou;

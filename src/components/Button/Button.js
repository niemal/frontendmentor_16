import styled, { keyframes, css } from "styled-components";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(10);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  background-color: var(--color-marine-blue);
  color: var(--color-white);
  cursor: pointer;
  margin-top: auto;
  align-self: end;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: var(--font-weight-bold);
  transition: all 0.35s ease-in-out;
  user-select: none;
  position: relative;
  width: max-content;
  overflow: hidden;
  border: none;

  outline-color: var(--color-purple-blue);
  outline-width: thick;

  ${(p) =>
    p.confirm
      ? `
    padding: 12px 32px;
    background-color: var(--color-purple-blue);
    outline-color: var(--color-marine-blue);
  `
      : ""}

  ${hoverSupported(css`
    &:hover {
      background-color: ${(p) =>
        p.confirm ? "var(--color-marine-blue)" : "var(--color-purple-blue)"};
    }
  `)}

  &:active {
    transform: scale(0.7);
  }

  &:active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${(p) =>
      p.confirm ? "var(--color-purple-blue)" : "var(--color-marine-blue)"};
    animation: ${ripple} 1s linear infinite;
    border-radius: 50%;
  }

  @media ${QUERIES.tabletAndSmaller} {
    padding: 8px 16px;
    font-size: ${14 / 16}rem;
    border-radius: 4px;
  }
`;

function Button({
  confirm,
  children,
  onClick,
  myTabIndex = "0",
  lastTabIndex,
  ...props
}) {
  return (
    <Wrapper
      confirm={confirm}
      tabIndex={myTabIndex}
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
    </Wrapper>
  );
}

export default Button;

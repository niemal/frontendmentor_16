import styled from "styled-components";
import Button from "../Button";
import { useContext, useRef, useEffect, useState } from "react";
import { MainContext } from "../MainBody/MainBody";
import { QUERIES } from "../constants";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 32px 80px;
  padding-top: 36px;
  padding-left: 70px;
  padding-right: 66px;
  padding-bottom: 16px;
  height: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    padding: 32px 24px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    align-items: start;
  }
`;

export const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease-in-out;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 24px;
    height: auto;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media ${QUERIES.tabletAndSmaller} {
    align-items: center;
    gap: 12px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    align-items: start;
  }
`;

export const Title = styled.h1`
  font-weight: var(--font-weight-bold);
  font-size: ${32 / 16}rem;
  color: var(--color-marine-blue);

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${24 / 16}rem;
  }
`;

export const Desc = styled.span`
  color: var(--color-cool-gray);
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media ${QUERIES.tabletAndSmaller} {
    gap: 8px;
    margin-top: -16px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

const InputError = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: var(--font-weight-bold);
  color: var(--color-strawberry-red);
  font-size: ${14 / 16}rem;
`;

const InputLabel = styled.label`
  font-size: ${14 / 16}rem;
  color: var(--color-marine-blue);

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${12 / 16}rem;
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid
    ${(p) =>
      p.error ? "var(--color-strawberry-red)" : "var(--color-light-gray)"};
  border-radius: 8px;
  padding: 12px;
  color: var(--color-marine-blue);
  font-size: ${16 / 16}rem;
  font-weight: var(--font-weight-bold);
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: var(--color-cool-gray);
  }

  &:focus {
    border-color: var(--color-purple-blue);
  }

  @media ${QUERIES.tabletAndSmaller} {
    font-size: ${12 / 16}rem;
    padding: 12px;
  }
`;

const DesktopButtonContainer = styled.div`
  align-self: end;
  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

export const MobileBottomRow = styled.div`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    width: calc(100% + 32px);
    padding: 16px;
    background-color: var(--color-white);
    display: flex;
    justify-content: end;
    bottom: -300px;
    left: -16px;
    position: absolute;
  }
`;

function PersonalInfo() {
  const nameRef = useRef(null);
  const [nameError, setNameError] = useState("");
  const emailRef = useRef(null);
  const [emailError, setEmailError] = useState("");
  const phoneRef = useRef(null);
  const [phoneError, setPhoneError] = useState("");
  const { data, setData, setActiveCard } = useContext(MainContext);

  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.value = data.personalInfo.name;
    }

    if (emailRef && emailRef.current) {
      emailRef.current.value = data.personalInfo.email;
    }

    if (phoneRef && phoneRef.current) {
      phoneRef.current.value = data.personalInfo.phone;
    }
  }, []);

  const validateInput = () => {
    let result = true;

    if (nameRef.current.value.length === 0) {
      setNameError(" This field is required");
      result = false;
    } else {
      setNameError("");
    }

    if (emailRef.current.value.length === 0) {
      setEmailError(" This field is required");
      result = false;
    } else if (
      !emailRef.current.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailError("A valid e-mail is required");
      result = false;
    } else {
      setEmailError("");
    }

    if (phoneRef.current.value.length === 0) {
      setPhoneError(" This field is required");
      result = false;
    } else {
      setPhoneError("");
    }

    return result;
  };
  return (
    <>
      <Wrapper>
        <Container>
          <TextWrapper>
            <Title>Personal info</Title>
            <Desc>
              Please provide your name, email address, and phone number.
            </Desc>
          </TextWrapper>

          <InputsContainer>
            <InputWrapper>
              <InputLabel htmlFor={"name-input"}>Name</InputLabel>
              <Input
                id={"name-input"}
                aria-describedby={"name-error"}
                error={nameError.length > 0}
                ref={nameRef}
                placeholder={"e.g. Stephen King"}
                onChange={(e) => {
                  const tmp = { ...data };
                  tmp.personalInfo.name = e.target.value;
                  setData(tmp);
                }}
              />
              <InputError id={"name-error"} aria-live={"polite"}>
                {nameError.length > 0 ? nameError : ""}
              </InputError>
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor={"email-input"}>Email Address</InputLabel>
              <Input
                id={"email-input"}
                aria-describedby={"email-error"}
                error={emailError.length > 0}
                ref={emailRef}
                placeholder={"e.g. stephenking@lorem.com"}
                onChange={(e) => {
                  const tmp = { ...data };
                  tmp.personalInfo.email = e.target.value;
                  setData(tmp);
                }}
              />
              <InputError id={"email-error"} aria-live={"polite"}>
                {emailError.length > 0 ? emailError : ""}
              </InputError>
            </InputWrapper>

            <InputWrapper>
              <InputLabel htmlFor={"phone-input"}>Phone Number</InputLabel>
              <Input
                id={"phone-input"}
                aria-describedby={"phone-error"}
                error={phoneError.length > 0}
                ref={phoneRef}
                placeholder={"e.g. +1 234 567 890"}
                onChange={(e) => {
                  const tmp = { ...data };
                  tmp.personalInfo.phone = e.target.value;
                  setData(tmp);
                }}
              />
              <InputError id={"phone-error"} aria-live={"polite"}>
                {phoneError.length > 0 ? phoneError : ""}
              </InputError>
            </InputWrapper>
          </InputsContainer>

          <DesktopButtonContainer>
            <Button
              onClick={() => {
                if (validateInput()) {
                  setActiveCard(1);
                }
              }}
            >
              Next Step
            </Button>
          </DesktopButtonContainer>
        </Container>
      </Wrapper>
      <MobileBottomRow>
        <Button
          onClick={() => {
            if (validateInput()) {
              setActiveCard(1);
            }
          }}
        >
          Next Step
        </Button>
      </MobileBottomRow>
    </>
  );
}

export default PersonalInfo;

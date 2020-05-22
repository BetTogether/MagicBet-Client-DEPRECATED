import React, { useContext } from "react";
import {
  MainWrapper,
  Modal,
  IconButton,
  Top,
  Title,
  Wrapper,
  Container,
  FormWrapper,
} from "./EmailModal.style";
import { ModalContext } from "store/context/ModalContext";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import { useEscapeKey } from "utils/hooks";

interface IEmailModalProps {
  isOpen: boolean;
}

const EmailModal = ({ isOpen }: IEmailModalProps) => {
  const { modalState, modalDispatch } = useContext(ModalContext);

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_EMAIL_MODAL",
      payload: !modalState.emailModalIsOpen,
    });

  // Escape key hook
  //useEscapeKey(toggleModal);

  return (
    <MainWrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>Send email once resolved...</Title>
          <IconButton onClick={() => toggleModal()}>
            <CrossIcon />
          </IconButton>
        </Top>
        <Wrapper>
          <Container>
            <FormWrapper>
              Turn on email notifications. Set your email in the account.
            </FormWrapper>
          </Container>
        </Wrapper>
      </Modal>
    </MainWrapper>
  );
};

export default EmailModal;

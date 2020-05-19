import React, { useContext } from "react";
import { Wrapper, Modal, IconButton, Top, Title } from "./TradeModal.style";
import { ModalContext } from "store/Context";
import { Clear } from "@rimble/icons";
import Uniswap from "./Exchanges/Uniswap";
import PBTC from "./Exchanges/PBTC";

interface ITradeModal {
  isOpen: boolean;
}

const TradeModal = ({ isOpen }: ITradeModal) => {
  const { modalState, modalDispatch } = useContext(ModalContext);

  const toggleModal = () =>
    modalDispatch({
      type: "TOGGLE_TRADE_MODAL",
      payload: !modalState.tradeModalIsOpen,
    });

  return (
    <Wrapper isOpen={isOpen}>
      <Modal>
        <Top>
          <Title>ETH &#x2192; DAI</Title>
          <IconButton onClick={() => toggleModal()}>
            <Clear />
          </IconButton>
        </Top>
        <Uniswap />
        <Top>
          <Title>BTC &#x2192; PBCT</Title>
        </Top>
        <PBTC />
      </Modal>
    </Wrapper>
  );
};

export default TradeModal;

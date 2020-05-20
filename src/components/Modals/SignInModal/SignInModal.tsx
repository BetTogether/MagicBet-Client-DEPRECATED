import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useKeyPress, useOnClickOutside } from "utils/hooks";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected, portis } from "utils/connectors";
import { useEagerConnect } from "utils/hooks";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import {
  Wrapper,
  Modal,
  IconButton,
  Buttons,
  StyledButton,
  Logo,
  ProviderWrapper,
  ProviderContent,
  ProviderTitle,
  ProviderDescription,
} from "./SignInModal.style";
import { ReactComponent as CrossIcon } from "assets/cross.svg";
import { ModalContext } from "store/context/ModalContext";
import portisLogo from "assets/portis.svg";
import metamaskLogo from "assets/metamask.svg";
import Spinner from "utils/spinner";

interface ISignInModalProps {
  isOpen: boolean;
}

const SignInModal = ({ isOpen }: ISignInModalProps) => {
  const { connector, activate, error } = useWeb3React<Web3Provider>();

  const { modalState, modalDispatch } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  const connectorsByName: { [name: string]: AbstractConnector } = {
    Injected: injected,
    Portis: portis,
  };

  const toggleModal = () => {
    modalDispatch({
      type: "TOGGLE_SIGN_IN_MODAL",
      payload: !modalState.signInModalIsOpen,
    });
  };

  // const triedEager = useEagerConnect();
  // console.log("triedEager:", triedEager);
  //useInactiveListener(!triedEager);

  //#region
  const node = useRef<any>(null);
  const handleClickOutside = useCallback(
    (event: any) => {
      if (event.composedPath().includes(node.current)) {
        return;
      }
      modalDispatch({
        type: "TOGGLE_SIGN_IN_MODAL",
        payload: !modalState.signInModalIsOpen,
      });
    },
    [modalDispatch, modalState.signInModalIsOpen]
  );

  const escFunction = useCallback(
    (event: any) => {
      if (event.keyCode === 27)
        modalDispatch({
          type: "TOGGLE_SIGN_IN_MODAL",
          payload: !modalState.signInModalIsOpen,
        });
    },
    [modalDispatch, modalState.signInModalIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      // document.addEventListener("keydown", escFunction, false);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // document.removeEventListener("keydown", escFunction, false);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [escFunction, handleClickOutside, isOpen]);
  //#endregion

  const setConnector = async (currentConnector: any, name: any) => {
    console.log("name:", name);
    setLoading(true);
    // setActivatingConnector(currentConnector);
    await activate(connectorsByName[name]);
    setLoading(false);
    toggleModal();
  };

  return (
    <Wrapper isOpen={isOpen}>
      <Modal ref={node}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IconButton onClick={() => toggleModal()}>
              <CrossIcon />
            </IconButton>

            <Buttons>
              {Object.keys(connectorsByName).map((name) => {
                const currentConnector = connectorsByName[name];
                const connected = currentConnector === connector;
                const disabled = connected || !!error;

                const LogoSrc = name === "Injected" ? metamaskLogo : portisLogo;

                return (
                  <ProviderWrapper key={name}>
                    <ProviderContent>
                      <StyledButton
                        disabled={disabled}
                        onClick={() => {
                          setConnector(currentConnector, name);
                        }}
                      >
                        <Logo alt="logo" src={LogoSrc} />
                        <ProviderTitle>
                          {name === "Injected" ? "MetaMask" : name}
                        </ProviderTitle>
                        <ProviderDescription>
                          Connect with your{" "}
                          {name === "Injected" ? "MetaMask" : name} account
                        </ProviderDescription>
                      </StyledButton>
                    </ProviderContent>
                  </ProviderWrapper>
                );
              })}
              {/* <ProviderWrapper>
                <ProviderContent>
                  <StyledButton onClick={() => setConnector("Injected")}>
                    <Logo alt="MetaMask" src={metamaskLogo} />
                    <ProviderTitle>MetaMask</ProviderTitle>
                    <ProviderDescription>
                      Connect with your MetaMask account
                    </ProviderDescription>
                  </StyledButton>
                </ProviderContent>
              </ProviderWrapper>
              <ProviderWrapper>
                <ProviderContent>
                  <StyledButton onClick={() => setConnector("Portis")}>
                    <Logo alt="Portis" src={portisLogo} />
                    <ProviderTitle>Portis</ProviderTitle>
                    <ProviderDescription>
                      Connect with your Portis account
                    </ProviderDescription>
                  </StyledButton>
                </ProviderContent>
              </ProviderWrapper> */}
            </Buttons>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default SignInModal;

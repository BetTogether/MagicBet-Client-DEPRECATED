import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.palette3.gray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin: 0 1.5rem;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.palette3.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

export const Prompt = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 3rem;
`;

export const MarketDetails = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MarketAmount = styled.h3`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2rem;
  margin: 0;
  padding: 0;
`;

export const GraphFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
`;

export const ChartWrapper = styled.div`
  flex-grow: 1;
  width: 75%;
`;

export const Form = styled.form`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const ItemDescription = styled.p`
  color: #555;
  font-size: 12px;
  line-height: 1.5;
  margin: 0 0 10px;
  padding: 0;
`;

export const Select = styled.select`
  width: 50%;
  height: 3rem;
  margin: 0rem;
  border-radius: 1rem;
  white-space: normal;
  background: ${(props) => props.theme.palette3.white};
  color: ${(props) => props.theme.palette3.black};
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.palette3.red};
  outline: none;
  /* @media (max-width: 800px) {
    width: 100%;
  } */
`;

export const Option = styled.option`
  color: ${(props) => props.theme.palette3.black};
  background: ${(props) => props.theme.palette3.white};
  display: flex;
  min-height: 2rem;
  padding: 0px 2px 1px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 0.33rem 1rem;
  cursor: pointer;
`;

export const Input = styled.input`
  border-style: none;
  background-color: ${(props) => props.theme.palette3.gray};
  color: ${(props) => props.theme.palette3.black};
  font-size: 70px;
  margin-bottom: 0;
  text-align: center;
  width: 50%;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.palette3.red};
  border: 2px solid ${(props) => props.theme.palette3.red};
  color: ${(props) => props.theme.palette3.white};
  border-bottom-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.33rem;
  padding: 0.67rem 2rem;
  transition: all 0.2s;
  margin: 0 auto;
`;

export const BuyTicket = styled.button`
  color: ${(props) => props.theme.palette3.white};
  background-color: ${(props) => props.theme.palette3.red};
  padding: 0.5rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
  &:focus {
    outline: none;
  }
`;

export const OwnerButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const OwnerButton = styled.button`
  background-color: ${(props) => props.theme.palette3.black};
  border: none;
  color: ${(props) => props.theme.palette3.white};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.palette3.red};
  }
`;
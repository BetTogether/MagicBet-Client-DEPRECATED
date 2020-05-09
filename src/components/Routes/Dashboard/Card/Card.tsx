import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  Content,
  Header,
  ID,
  Question,
  MarketContent,
  Section,
  Item,
  MarketAmount,
  ItemDescription,
  DaiLabel,
  DaiChildLabel,
  DaiInput,
  OwnerButton,
  OwnerButtons,
  Option,
  Select,
  Form,
  Button,
  Input,
} from "./Card.style";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Chart";

const Card = ({ marketContract, daiContract }: any) => {
  console.log("daiContract:", daiContract);
  // const [usingDai, setUsingDai] = useState(true);
  const [marketsDaiBalance] = useState(0);
  const [amountToBet, setAmountToBet] = useState(0);
  const [approve] = useState(false);
  // const [accrued, setAccrued] = useState(0);
  const [AAVEToken] = useState(0);
  const [gross] = useState(3);
  const [state, setState] = useState(null);
  const LotteryStates = ["OPEN", "COMMITTING", "REWARDING"];
  // const [winnings, setWinnings] = useState(null);
  const [accountBalance] = useState(0);
  const activeAccount = "0x1d9999be880e7e516dEefdA00a3919BdDE9C1707";
  const [prompt, setPrompt] = useState("");
  const [owner, setOwner] = useState("");
  const [choice, setChoice] = useState("");

  useEffect(() => {
    (async () => {
      if (marketContract) {
        console.log("marketContract:", marketContract);
        const owner = await marketContract.owner();
        console.log("owner:", owner);
      }
    })();
  }, [marketContract]);

  const enableDai = async (e: any) => {
    const val = e.target.checked;
    let balance = await daiContract.balanceOf(activeAccount);
    if (!val) balance = 0;
    await daiContract.approve(marketContract.address, balance);
  };

  const submitFunds = async (e: any) => {
    e.preventDefault();
    console.log(choice);
    console.log(amountToBet);
  };

  const checkOwner = () => {
    if (owner !== null && activeAccount !== null) {
      if (activeAccount === null) return false;
      return activeAccount === owner;
    } else {
      return false;
    }
  };

  //   /** OWNER FUNCTIONS */
  const incrementState = async () => {
    console.log("incrementState:");

    // await contract.methods.incrementState().send({
    //   from: activeAccount,
    // });
  };

  const disable = async () => {
    console.log("disable:");
    // await methods
    //   .disableContract()
    //   .send({
    //     from: activeAccount,
    //   });
  };

  useEffect(() => {
    // const getAllowance = async () => {
    // };
    // if (activeAccount) {
    //   getAllowance().then((allowance) => {
    //     if (allowance !== "0") setApprove(true);
    //   });
    // }
  }, []);

  const OptionsList = [
    {
      optionName: "Dublin, Ireland",
      percentage: 26,
    },
    {
      optionName: "New York, US",
      percentage: 24,
    },
    {
      optionName: "Tokyo, Japan",
      percentage: 18,
    },
    {
      optionName: "Paris, France",
      percentage: 12,
    },
    {
      optionName: "London, England",
      percentage: 10,
    },
    {
      optionName: "Shenzen, China",
      percentage: 6,
    },
    {
      optionName: "Berlin, Germany",
      percentage: 3,
    },
    {
      optionName: "Dhaka, Bangladesh",
      percentage: 1,
    },
  ];

  return (
    <Content>
      <Header>
        {/* <ID>{marketContractName}</ID> */}
        <span>{"Open"}</span>
        <span>{"10:23:22"}</span>
      </Header>
      <Question>
        What city will have the highest growth of GDP per capita by the end of
        2020?
      </Question>
      <Chart />
      <MarketContent>
        <Section>
          <Item>
            <MarketAmount>
              {`${marketsDaiBalance ? marketsDaiBalance : "0"}`} Dai
            </MarketAmount>
            <ItemDescription>Compounding Pot</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>{AAVEToken} Dai</MarketAmount>
            <ItemDescription>In AAVE</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>Dublin, Ireland</MarketAmount>
            <ItemDescription>Favorite</ItemDescription>
          </Item>
        </Section>
        <Section>
          <Item>
            <MarketAmount>
              <CountUp
                start={0}
                end={gross}
                decimals={4}
                preserveValue={true}
              />{" "}
              Dai
            </MarketAmount>
            <ItemDescription>Potential Winnings</ItemDescription>
          </Item>
          <Item>
            <MarketAmount>{accountBalance} Dai</MarketAmount>
            <ItemDescription>Your Balance</ItemDescription>
          </Item>
          <Item>
            <>
              <DaiInput type="checkbox" id="check" onChange={enableDai} />
              <DaiLabel htmlFor="check" isChecked={approve}>
                <DaiChildLabel isChecked={approve} />
              </DaiLabel>
            </>
            <ItemDescription>Approve Dai</ItemDescription>
          </Item>
        </Section>

        <Form onSubmit={submitFunds}>
          <Select value={choice} onChange={(e) => setChoice(e.target.value)}>
            {OptionsList.map((Opt: any) => (
              <Option key={uuidv4()} value={Opt.optionName}>
                {Opt.optionName} - {Opt.percentage}%
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="0"
            onChange={(e: any) => setAmountToBet(e.target.value)}
          />
          <Button disabled={amountToBet <= 0}>Enter</Button>
        </Form>

        {/* {checkOwner() && (
          <>
            <h1>TEST BUTTONS BELOW...</h1>
            <OwnerButtons>
              <OwnerButton onClick={() => incrementState()}>
                Increment State
              </OwnerButton>
              <OwnerButton onClick={() => disable()}>
                Disable Contract
              </OwnerButton>
            </OwnerButtons>
          </>
        )} */}
      </MarketContent>
    </Content>
  );
};

export default Card;

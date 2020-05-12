import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Countdown from "react-countdown";
import { v4 as uuidv4 } from "uuid";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { ShortenAddress } from "utils/ShortenAddress";
import {
  Content,
  Header,
  Prompt,
  GraphFormWrapper,
  ChartWrapper,
  MarketDetails,
  Item,
  MarketAmount,
  Form,
  ItemDescription,
  Option,
  Select,
  Button,
  Input,
  OwnerButton,
  OwnerButtons,
} from "./Card.style";
import Chart from "./Chart";

const Card = ({ marketContract, daiContract }: any) => {
  console.log("marketContract:", marketContract);
  const context = useWeb3React<Web3Provider>();
  const { active, account, library } = context;
  const [totalBet, setTotalBet] = useState(0);
  const [amountToBet, setAmountToBet] = useState(0);
  const [approve, setApprove] = useState(false);
  const [accrued, setAccrued] = useState(0);
  const [AAVEToken] = useState(0);
  const [gross] = useState(3);
  const [state, setState] = useState("");
  const MarketStates = ["OPEN", "COMMITTING", "REWARDING"];
  const [accountBalance] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [owner, setOwner] = useState("");
  const [choice, setChoice] = useState("");
  const [outcomes, setOutcomes] = useState<any>([]);
  const [marketResolutionTime, setMarketResolutionTime] = useState(null);

  useEffect(() => {
    (async () => {
      if (marketContract) {
        let state = await marketContract.state();
        setState(MarketStates[state]);
        let prompt = await marketContract.eventName();
        setPrompt(prompt);
        const owner = await marketContract.owner();
        setOwner(owner);
        const totalBet = await marketContract.totalBet();
        setTotalBet(totalBet);
        const marketResolutionTime = await marketContract.marketResolutionTime();
        setMarketResolutionTime(marketResolutionTime);

        // const totalBets = marketContract.totalBet()
        const totalBets = 100;
        const DT = await marketContract.eventOutcomes(0);
        // const DTNumberOfBets = await marketContract.totalBetPerOutcome(0);
        const DTNumberOfBets = 60;
        const JB = await marketContract.eventOutcomes(1);
        // const JBNumberOfBets = await marketContract.totalBetPerOutcome(1);
        const JBNumberOfBets = 40;
        setOutcomes([
          ...outcomes,
          { name: DT, percentage: DTNumberOfBets / totalBets },
          { name: JB, percentage: JBNumberOfBets / totalBets },
        ]);
        // let numberOfOutcomes = (
        //   await marketContract.numberOfOutcomes()
        // ).toNumber();
        // for (let i = 0; i < numberOfOutcomes; i++) {
        //   let newOutcomeName = await marketContract.eventOutcomes(i);
        //   console.log("newOutcomeName:", newOutcomeName);
        //   setOutcomes([...outcomes, { name: newOutcomeName }]);
        // }
      }
    })();
    /* eslint-disable */
  }, []);

  useEffect(() => {
    (async () => {
      const isPaused = await marketContract.paused();
      console.log("isPaused:", isPaused);
    })();
  }, [marketContract]);

  useEffect(() => {
    const getAllowance = async () => {
      return await daiContract.allowance(account, marketContract.address);
    };
    if (account) {
      getAllowance().then((allowance) => {
        if (allowance !== "0") {
          setApprove(true);
        }
      });
    }
  }, []);

  const placeBet = async (e: any) => {
    e.preventDefault();
    console.log(choice);
    console.log(amountToBet);

    let choiceAsNumber: number;
    choice === "Donald Trump" ? (choiceAsNumber = 0) : (choiceAsNumber = 1);

    console.log("approve:", approve);
    if (!approve) {
      let balance = await daiContract.balanceOf(account);
      await daiContract.approve(marketContract.address, balance);
      setApprove(true);
    }
    try {
      await marketContract.placeBet(choiceAsNumber, amountToBet);
      // .sendTransaction({
      //   to: marketContract.address,
      //   value: ethers.utils.parseEther("1.0"),
      //   chainId: networkId,
      // });
    } catch (error) {
      throw error;
    }
  };

  const checkOwner = () => {
    if (owner !== null && account !== null) {
      if (account === null) return false;
      return account === owner;
    } else {
      return false;
    }
  };

  //   /** OWNER FUNCTIONS */
  const incrementState = async () => {
    await marketContract.incrementState();
  };

  const disable = async () => {
    await marketContract.disableContract();
  };

  return (
    <Content>
      <Header>
        <span>{ShortenAddress(marketContract.address)}</span>
        <span>{state ? state : "-"}</span>
        <span>{/* <CountDown  /> */}</span>
      </Header>
      <Prompt>{prompt}</Prompt>

      <MarketDetails>
        <Item>
          <ItemDescription>Potential Winnings (in Dai)</ItemDescription>
          <MarketAmount>
            <CountUp
              start={0}
              end={gross}
              decimals={2}
              preserveValue={true}
              duration={5}
            />
          </MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Your Balance</ItemDescription>
          <MarketAmount>{accountBalance}</MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Total Pot</ItemDescription>
          <MarketAmount>{`${totalBet ? totalBet : "-"}`}</MarketAmount>
        </Item>
        <Item>
          <ItemDescription>Compounding In AAVE</ItemDescription>
          <MarketAmount>{AAVEToken}</MarketAmount>
        </Item>
      </MarketDetails>

      <GraphFormWrapper>
        <ChartWrapper>
          <Chart outcomes={outcomes} />
        </ChartWrapper>

        <Form onSubmit={placeBet}>
          <Select
            value={choice}
            onChange={(e: any) => setChoice(e.target.value)}
          >
            <Option key={uuidv4()} value="" />
            {outcomes.map((outcome: any) => (
              <Option key={uuidv4()} value={outcome.name}>
                {outcome.name}
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="0"
            onChange={(e: any) => setAmountToBet(e.target.value)}
          />
          {!!(library && account) && (
            <Button disabled={amountToBet <= 0 || active === false}>
              Enter
            </Button>
          )}
        </Form>
      </GraphFormWrapper>

      {checkOwner() && (
        <>
          <h1>TESTING FUNCTIONALITY - Owner: {ShortenAddress(owner)}</h1>
          <OwnerButtons>
            <OwnerButton onClick={() => incrementState()}>
              Increment State
            </OwnerButton>
            <OwnerButton onClick={() => disable()}>
              Disable Contract
            </OwnerButton>
          </OwnerButtons>
        </>
      )}
    </Content>
  );
};

export default Card;

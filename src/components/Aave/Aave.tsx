import React from "react";
import templogo from "assets/icons/aave.svg";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Table, Image } from "rimble-ui";
import { ShortenAddress } from "utils/ShortenAddress";

const GET_LAST_DEPOSITS_FROM_USER = gql`
  {
    deposits(where: { user: "0x15ae150d7dc03d3b635ee90b85219dbfe071ed35" }) {
      user {
        id
      }
      amount
      timestamp
      pool {
        lendingPool
      }
    }
  }
`;

function Aave() {
  const { loading, error, data } = useQuery(GET_LAST_DEPOSITS_FROM_USER);
  console.log({ data });

  return (
    <>
      <Image src={templogo} borderRadius={8} height="8rem" alt="AAVE-logo" />
      <Table borderColor={"gray"} color={"gray"}>
        <thead>
          <tr>
            <th>User</th>
            <th>Lending Pool</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            !error &&
            data &&
            data.deposits.map((item: any, index: number) => (
              <tr key={index}>
                <td>{ShortenAddress(item.user.id)}</td>
                <td>{ShortenAddress(item.pool.lendingPool)}</td>
                <td>{`${item.amount}$`}</td>
                <td>{new Date(1000 * item.timestamp).toUTCString()}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default Aave;

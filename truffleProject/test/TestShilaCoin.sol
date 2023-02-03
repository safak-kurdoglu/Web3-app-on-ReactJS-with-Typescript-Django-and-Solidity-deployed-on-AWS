// SPDX-License-Identifier: non
pragma solidity ^0.8.0;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ShilaCoin.sol";

contract TestShilaCoin {

  function testInitialBalanceWithSilaCoin() public {
    ShilaCoin shila = new ShilaCoin();

    uint expected = 1000000;

    Assert.equal(shila.getBalance(), expected, "Owner should have 1000000 ShilaCoin initially");
  }

}
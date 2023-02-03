const ShilaCoin = artifacts.require("ShilaCoin");
const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
  deployer.deploy(ShilaCoin);
  deployer.deploy(MyToken,"MyERC721","ShilaToken");
};

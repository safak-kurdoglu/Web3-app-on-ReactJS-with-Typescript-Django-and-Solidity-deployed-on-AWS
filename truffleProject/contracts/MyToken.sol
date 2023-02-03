// SPDX-License-Identifier: non
pragma solidity ^0.8.0;

import "./MyERC721.sol";

contract MyToken is MyERC721 {
    
    // Unique token ids.
    uint256 private tokenId;

    // Token exOwners to authorize cancel from sale.
    mapping(uint256 => address) tokensInSale;

    // Token prices on sale.
    mapping(uint256 => uint256) tokensPrice;

    // User ownership of NFTs on sale, used to authorizations on app.
    mapping(address => uint256[]) private ownersOfNFTsOnSale;


    constructor(string memory name, string memory symbol) MyERC721(name, symbol) {  

    }

    // Returns ownerships of NFTs with view (gas free) function.
    function showNFTs() public view returns(uint256[] memory){
         return ownersOfNFTs[_msgSender()];
    }

    // Returns ownership of contract with wiew (gas free) function for authorization on app.
    function isOwner() public view returns(bool ){
        return _msgSender() == _owner;
    }

    // Returns ownerships of NFTs on sale with view (gas free) function.
    function showSaleNFTs() public view returns(uint256[] memory){
         return ownersOfNFTsOnSale[_msgSender()];
    }

    // Minting NFT.
    function mint() public returns (uint256){
        _mint(msg.sender, tokenId);
        tokenId++;
        return tokenId-1;
    }

    // Putting NFT to sale.
    function startSale(uint256 tokenId_, uint256 tokenPrice) public {
        require(MyERC721.ownerOf(tokenId_) == _msgSender(), "ERC721: You are not the owner of the token");
        
        ownersOfNFTsOnSale[_msgSender()].push(tokenId_);
        tokensInSale[tokenId_] = _msgSender();
        tokensPrice[tokenId_] = tokenPrice;

        _takeNFT(tokenId_);
    }    

    // Buying NFT.
    function finishSale(uint256 tokenId_) public payable{
        require(_msgValue() == tokensPrice[tokenId_], "Amount is wrong");

        payable(tokensInSale[tokenId_]).transfer(_msgValue());
        delete tokensPrice[tokenId_];
        delete tokensInSale[tokenId_];

        _sendTokenTo(_msgSender(), tokenId_);
    }

    // Canceling from sale.
    function cancelSale(uint256 tokenId_) public{
        require(tokensInSale[tokenId_] == _msgSender(), "ERC721: You are not the owner of the token");
        
        delete tokensPrice[tokenId_];
        delete tokensInSale[tokenId_];

        _sendTokenTo(_msgSender(), tokenId_);
    }

    // Transfering NFT.
    function transfer(address to, uint256 tokenID) public {

        _transfer(to, tokenID);
    }

    // Taking NFT to NFT fight
    function takeNFT(uint256 tokenId_) external payable { 
        require(MyERC721.ownerOf(tokenId_) == _msgSender(), "ERC721: You are not the owner of the token");
        require(msg.value == 100000000000000000, "You must pay 100000000000000000 wei to attend");
        
        _takeNFT(tokenId_);
    }
 
    // Sending NFT fight rewards.
    function sendNFTsToWinner(uint256 tokenIdF, uint256 tokenIdS, address to) public {
        require(_owner == _msgSender(), "ERC721: You are not the owner of the contract");   
        
        _sendNFTsToWinner(tokenIdF, tokenIdS, to);
    }
}
// SPDX-License-Identifier: non

pragma solidity ^0.8.0;



interface IERC721Events {

    //Emitted when `tokenId` token is sent from 'from' to 'to'.
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
 
    //Emitted when `tokenId` token is sent to smart contract from 'from'.
    event TakeNFT(address indexed from, uint256 indexed tokenId);

    //Emitted when `tokenId` token is sent from smart contract to 'to'.
    event sendRewardNFTs(uint256 indexed tokenIdF, uint256 indexed tokenIdS, address indexed to);


}

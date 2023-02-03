// SPDX-License-Identifier: non
pragma solidity ^0.8.0;


import "./IERC721Events.sol";
import "./utils/Context.sol";


contract MyERC721 is IERC721Events, Context {

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    //owner of the deployed contract
    address public _owner;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // User ownership of NFTs, used to authorizations on app.
    struct NFTFeatures {
        uint256[] ids;
        string[] names;
        uint256[] powers;
    }
    mapping(address => uint256[]) public ownersOfNFTs;



    constructor(string memory name_, string memory symbol_) {        
        _name = name_;        
        _symbol = symbol_;    
        _owner = _msgSender();
    }


    function name() public view virtual  returns (string memory) {
        return _name;
    }


    function symbol() public view virtual  returns (string memory) {
        return _symbol;
    }


    function _removeFromOwnership(uint256 tokenId) internal virtual {
        uint256[] memory ownerAr = ownersOfNFTs[_msgSender()];

        uint j = 0;
        for (uint i = 0; i<ownerAr.length-1; i++){
            if(ownerAr[i] == tokenId)
                j = 1;
            ownerAr[i] = ownerAr[i+j];
        }

        assembly { mstore(ownerAr, sub(mload(ownerAr), 1)) }
        ownersOfNFTs[_msgSender()] = ownerAr;
    }


    function balanceOf(address owner) public view virtual  returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }


    function ownerOf(uint256 tokenId) public view virtual returns (address) {
        address owner = _owners[tokenId];

        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }


    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }


    function _mint(address to, uint256 tokenId) internal virtual{
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;
        ownersOfNFTs[to].push(tokenId);

        emit Transfer(address(0), to, tokenId);
    } 
    

    function _transfer(address to, uint256 tokenId) internal virtual {
        require(MyERC721.ownerOf(tokenId) == _msgSender(), "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _balances[_msgSender()] -= 1;
        _removeFromOwnership(tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;
        ownersOfNFTs[to].push(tokenId);

        emit Transfer(_msgSender(), to, tokenId);
    }


    function _takeNFT(uint256 tokenId) internal {
        delete _owners[tokenId];
        _balances[_msgSender()] -= 1;
        _removeFromOwnership(tokenId);

        emit TakeNFT(_msgSender(), tokenId);
    }


    //_sendNFTsToWinner function is to send nfts and amounts to winner.
    //_sendNFTsToWinner function can only be called by contract owner.
    function _sendNFTsToWinner(uint256 tokenIdF, uint256 tokenIdS, address to) internal {
        _balances[to] += 2;
        _owners[tokenIdF] = to;   
        _owners[tokenIdS] = to;  
        ownersOfNFTs[to].push(tokenIdF);
        ownersOfNFTs[to].push(tokenIdS);

        payable(to).transfer((100000000000000000)*19/10);  //This amount is sent to game winner.
        payable(_msgSender()).transfer((100000000000000000)*1/10);  //This amount is sent to transaction owner.

        emit sendRewardNFTs(tokenIdF, tokenIdS, to);
    }


    function _sendTokenTo(address to, uint256 tokenId_) internal {
        _balances[to] += 1;
        _owners[tokenId_] = to;   
        ownersOfNFTs[to].push(tokenId_);
    }

}
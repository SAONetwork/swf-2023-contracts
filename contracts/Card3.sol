// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Card3 is ERC721 {

    string private _base_uri;
    uint256 public idx = 0;

    mapping(uint256 => string) public metadataIds;
    mapping(uint256 => uint256) public idxFrom;

    constructor(string memory name, string memory symbol, string memory _uri) ERC721(name, symbol) {
        _base_uri = _uri;
    }

    function mint(string memory dataId) external {
        idx += 1;
        _mint(_msgSender(), idx);
        metadataIds[idx] = dataId;
    }

    function send(uint256 tokenId, address to) external {
        require(ownerOf(tokenId) == _msgSender(), "Only owner");
        idx += 1;
        _mint(to, idx);
        metadataIds[idx] = metadataIds[tokenId];
        idxFrom[idx] = tokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_base_uri, metadataIds[tokenId]));
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        revert("Cannot transfer Card3 NFT");
    }

    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }
}

import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';

describe('card3', function () {
  let card3: Contract;
  let owner: Signer;
  let alice: Signer;

  beforeEach(async function () {
    const Card3: ContractFactory = await ethers.getContractFactory(
      'Card3'
    );
    card3 = await Card3.deploy("Card3 Network", "Card3", "https://gateway-testnet.sao.network/sao/");
    await card3.deployed();

    [owner, alice] = await ethers.getSigners();
  });

  it('should deploy the contract correctly', async function () {
    expect(card3.address).to.not.equal(0);
  });

  it('should mint success', async function () {

    const string = "test";
    await card3.mint("test");
    const idx: number = await card3.idx()
    expect(idx).to.equal(1);
    const idxFrom: number = await card3.idxFrom(1)
    expect(idxFrom).to.equal(0);

  });

  it('should send success', async function () {
    const string = "test";
    await card3.mint("test");

    await expect(card3.connect(alice).send(1, owner.getAddress())).to.be.revertedWith("Only owner")
    await card3.connect(owner).send(1, alice.getAddress())
    const idx: number = await card3.idx()
    expect(idx).to.equal(2);
    await expect(card3.connect(alice).transferFrom(alice.getAddress(), owner.getAddress(), 2)).to.be.revertedWith("Cannot transfer Card3 NFT")
  });
});

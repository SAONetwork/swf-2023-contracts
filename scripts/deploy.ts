import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const deploy = {
  /**
   * Main function to deploy the TipCreator contract.
   * @returns {Promise<void>}
   */
  async main(): Promise<void> {
    try {
      const Card3 : ContractFactory = await ethers.getContractFactory(
        'Card3'
      );
      const card3: Contract = await Card3.deploy("Card3 Network", "Card3", "https://gateway-testnet.sao.network/sao/");

      await card3.deployed();

      // card3 to: 0xdFC3d764572a6989175476e0c16faE9dE404470B
      console.log('card3 to:', card3.address);
    } catch (error) {
      console.log(error);
    }
  },
};

deploy
  .main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

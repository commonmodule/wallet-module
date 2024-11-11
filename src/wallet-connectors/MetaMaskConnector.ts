import MetaMaskExtenstionConnector from "./MetaMaskExtenstionConnector.js";
import MetaMaskSDKConnector from "./MetaMaskSDKConnector.js";
import WalletConnector from "./WalletConnector.js";

const windowEthereum = window.ethereum;

const MetaMaskConnector: WalletConnector = windowEthereum
  ? MetaMaskExtenstionConnector
  : MetaMaskSDKConnector;

export default MetaMaskConnector;

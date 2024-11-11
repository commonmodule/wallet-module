import MetaMaskExtenstionConnector from "./MetaMaskExtenstionConnector.js";
import MetaMaskSDKConnector from "./MetaMaskSDKConnector.js";
const windowEthereum = window.ethereum;
const MetaMaskConnector = windowEthereum
    ? MetaMaskExtenstionConnector
    : MetaMaskSDKConnector;
export default MetaMaskConnector;
//# sourceMappingURL=MetaMaskConnector.js.map
import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalWalletConnector from "../UniversalWalletConnector.js";
import WalletConnector from "../wallet-connectors/WalletConnector.js";

export default class WalletButtonGroup extends ButtonGroup {
  constructor(
    buttonText: string,
    onWalletSelect: (walletConnector: WalletConnector) => void,
  ) {
    super();
    this.append(
      ...UniversalWalletConnector.connectors.map((connector) =>
        new Button({
          type: ButtonType.Outlined,
          icon: connector.walletIcon.clone(),
          title: `${buttonText} with ${connector.walletName}`,
          onClick: () => onWalletSelect(connector),
        })
      ),
    );
  }
}

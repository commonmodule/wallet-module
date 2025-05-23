import { Button, ButtonGroup, ButtonType } from "@commonmodule/app-components";
import UniversalWalletConnector from "../UniversalWalletConnector.js";
export default class WalletButtonGroup extends ButtonGroup {
    constructor(buttonText, onWalletSelect) {
        super();
        this.append(...UniversalWalletConnector.connectors.map((connector) => new Button({
            type: ButtonType.Outlined,
            icon: connector.walletIcon.clone(),
            title: `${buttonText} with ${connector.walletName}`,
            onPress: () => onWalletSelect(connector),
        })));
    }
}
//# sourceMappingURL=WalletButtonGroup.js.map
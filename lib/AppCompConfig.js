import { DomNode } from "@common-module/app";
class DefaultLoadingSpinner extends DomNode {
    constructor() {
        super(".loading-spinner");
    }
}
class DefaultSuccessIcon extends DomNode {
    constructor() {
        super("span.icon.success", "✅");
    }
}
class DefaultInfoIcon extends DomNode {
    constructor() {
        super("span.icon.info", "ℹ️");
    }
}
class DefaultWarningIcon extends DomNode {
    constructor() {
        super("span.icon.warning", "⚠️");
    }
}
class DefaultErrorIcon extends DomNode {
    constructor() {
        super("span.icon.error", "❌");
    }
}
class DefaultAccordionOpenIcon extends DomNode {
    constructor() {
        super("span.icon.accordion-open", "▼");
    }
}
class DefaultAccordionCloseIcon extends DomNode {
    constructor() {
        super("span.icon.accordion-close", "▲");
    }
}
class AppCompConfig {
    LoadingSpinner = DefaultLoadingSpinner;
    SuccessIcon = DefaultSuccessIcon;
    InfoIcon = DefaultInfoIcon;
    WarningIcon = DefaultWarningIcon;
    ErrorIcon = DefaultErrorIcon;
    AccordionOpenIcon = DefaultAccordionOpenIcon;
    AccordionCloseIcon = DefaultAccordionCloseIcon;
}
export default new AppCompConfig();
//# sourceMappingURL=AppCompConfig.js.map
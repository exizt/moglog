export declare class Moglog {
    private tocTarget;
    private contextTarget;
    private headHtml;
    private htags;
    private tocPosition;
    private tocClassName;
    private anchorNamePrefix;
    private callbackFunction;
    private isDebug;
    private readonly _defaultOptions;
    constructor(options: IMoglogOptions);
    build(): void;
    private callback;
    private buildHtml;
    private buildTocHTMLText;
    private prependElement;
    private appendElement;
    private debugLog;
}
interface IMoglogOptions {
    toc: string;
    contents?: string;
    header?: string;
    htags?: string;
    position?: string;
    tocClass?: string;
    linkPrefix?: string;
    callback?: Function | null;
    isDebug?: boolean;
}
export {};

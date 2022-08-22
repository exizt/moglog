export declare class Moglog {
    private tocTarget;
    private contextTarget;
    private anchorNamePrefix;
    private headHtml;
    private tocIn;
    private tocClassName;
    private htags;
    private _isDebug;
    private _callback;
    private _defaultOptions;
    constructor(options: IMoglogOptions);
    callback(args: any): void;
    build(): boolean;
    buildTocHTMLText(tocItems: IMoglogItems[]): string;
    private prependElement;
    private appendElement;
    private debugLog;
}
interface IMoglogOptions {
    toc: string;
    tocIn?: string;
    tocClass?: string;
    contents: string;
    htags?: string;
    linkPrefix?: string;
    header?: string;
    callback?: any;
    isDebug?: boolean;
}
interface IMoglogItems {
    aname: string;
    section: number;
    level: number;
    text: string;
}
export {};

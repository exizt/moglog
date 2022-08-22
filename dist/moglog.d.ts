export declare class Moglog {
    private tocTarget;
    private contextTarget;
    private headHtml;
    private htags;
    private tocPosition;
    private tocClassName;
    private anchorNamePrefix;
    private _isDebug;
    private _callback;
    private _defaultOptions;
    constructor(options: IMoglogOptions);
    callback(args: any): void;
    build(): void;
    buildHtml(): boolean;
    buildTocHTMLText(tocItems: IMoglogItems[]): string;
    private prependElement;
    private appendElement;
    private debugLog;
}
interface IMoglogOptions {
    toc: string;
    contents: string;
    position?: string;
    tocClass?: string;
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

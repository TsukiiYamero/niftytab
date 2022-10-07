export type ChromeTabs = {
    active: boolean;
    url: string;
    discarded: boolean;
    favIconUrl: string;
    groupId: number;
    id: number;
    title: string;
    index: number;
    pinned: true;
    selected: boolean;
    mutedInfo?: { muted: boolean };
    height?: number;
    audible?: boolean;
    highlighted?: boolean;
    autoDiscardable?: boolean;
    status?: string;
    incognito?: boolean;
    width?: number;
    windowId?: number;
}

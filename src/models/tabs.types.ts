import { PostgrestError } from '@supabase/supabase-js';

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
};

export type TabsSupabase = {
    id: number;
    url: string;
    pinned: boolean;
    active: boolean;
    discarded: boolean;
    session_id: number;
    group_id: number;
    user_id: string;
    favicon_url: string;
    title: string;
    index: number;
}

export type GroupsTabsSupabase = {
    user_id: string;
    collapsed: boolean;
    id?: number;
    color?: string;
    title?: string;
}

export type SessionTabsSupabase = {
    user_id: string;
    id?: number;
    browser_name?: string;
}

export type NiftyTab = {
    id: number;
    url: string;
    pinned: boolean;
    active: boolean;
    discarded: boolean;
    sessionId: number;
    groupId: number;
    favIconUrl: string;
    title: string;
    index: number;
}

export type SupabaseCommonResponse = {
    data: any[],
    error: PostgrestError | null
}

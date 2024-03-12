import type { PostgrestError } from '@supabase/supabase-js';

// Initial model of tabs
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

// Model for save in supabase
export type TabsSupabase = {
    referer_id: string; // url + id user
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

// Model for handle tabs in the app
export type NiftyTab = {
    refererId: string; // url + id of user
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

// Common response from supabase
export type SupabaseCommonResponse = {
    data: any[],
    error: PostgrestError | null
}

// all session Info
export interface SessionCloudSupabase {
    count_badge: number;
    id: number;
    name: string;
}

export interface SessionCloud {
    countBadge: number;
    id: number;
    name: string;
}
// session save
export interface SessionCloudSaveSupabase {
    browser_name: string;
    id: number;
    badge_content: number;

}
export interface SessionCloudSaveNifty {
    browserName: string;
    id: number;
    badgeContent: number;
}

// All Tabs Info
export interface TabsCloudSupabase {
    count_badge: number;
    id: number;
    name: string;
    tabs: TabsSupabase[];
}

export interface TabsCloud {
    countBadge: number;
    id: number;
    name: string;
    tabs: NiftyTab[];
}

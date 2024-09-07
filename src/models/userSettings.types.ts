export interface UserSettings {
    recentTabsLimit?: number,
    neverSuspendAudibleTabs?: boolean,
    excludeList?: string[],
    excludeTabsFromList?: boolean,
    suspendTabsAtStartup?: boolean,
    suspendTabsAfter?: number,
    suspendNotification?: boolean,
}

export interface UserDataStored {
    userSettings?: UserSettings,
    isSuspend?: boolean,
}

// get and set user data in chrome local storage
export interface UserData {
    userData: UserDataStored;
}

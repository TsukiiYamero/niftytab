export interface UserSettings {
    maxTabsinMemory?: number,
    neverSuspendAudibleTabs?: boolean,
    excludeList?: string[],
    excludeTabsFromList?: boolean,
    suspendTabsAtStartup?: boolean,
    suspendTabsAfter?: number,
}

export interface UserDataStored {
    userSettings?: UserSettings,
    isSuspend?: boolean,
}

// get and set user data in chrome local storage
export interface UserData {
    userData: UserDataStored;
}

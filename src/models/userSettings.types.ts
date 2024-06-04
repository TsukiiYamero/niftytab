export interface UserSettings {
    keepTabsInMemory?: boolean,
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

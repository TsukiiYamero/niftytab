/* eslint-disable @typescript-eslint/no-unused-vars */
import { SettingsContext, SettingsDispatchContext } from '@/contexts/Settings';
import { SettingsActions } from '@/contexts/Settings/settings.types';
import { isValidUrl } from '@/utils';
import { useContext, useState } from 'react';
import { SuspendSettingsView } from './SuspendSettingsView';

export const SuspendSettings = () => {
    const {
        temporarySettings: { maxTabsinMemory, suspendAudibleTabs, suspendTabsAtStartup, excludeList, excludeTabsFromList, keepTabsInMemory }
    } = useContext(SettingsContext);
    const { temporarySettingsDispatch } = useContext(SettingsDispatchContext);
    const [domainExcluded, setDomainExcluded] = useState('');

    const tabsOptions = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '7', value: 7 }, { label: '9', value: 9 }, { label: '11', value: 11 }];

    const handdleKeepTabsInMemory = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { keepTabsInMemory: !keepTabsInMemory }
        });
    };

    const handdleMaxTabsInMemory = (value: number) => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { maxTabsinMemory: value }
        });
    };

    const handdleSuspendAtStartup = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { suspendTabsAtStartup: !suspendTabsAtStartup }
        });
    };

    const handdleSuspendAudibleTabs = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { suspendAudibleTabs: !suspendAudibleTabs }
        });
    };

    const handdleDeleteExcludeItem = (index: number) => {
        const newExcludeList = excludeList?.filter((item, i) => i !== index);

        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { excludeList: newExcludeList }
        });
    };

    const handdleExcludeTabs = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { excludeTabsFromList: !excludeTabsFromList }
        });
    };

    const handdleNewExcludeItem = () => {
        if (domainExcluded.trim() === '' || !isValidUrl(domainExcluded.trim()))
            return;

        const excItemSanitized = domainExcluded.trim();

        const existitem = excludeList?.find(item => item === excItemSanitized);
        if (existitem)
            return;

        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { excludeList: [...excludeList ?? [], excItemSanitized] }
        });
        setDomainExcluded('');
    };

    return (
        <SuspendSettingsView
            listNumbersTabsInMemory={tabsOptions}
            keepTabsInMemory={keepTabsInMemory!}
            maxTabsinMemory={maxTabsinMemory!}
            suspendTabsAtStartup={suspendTabsAtStartup!}
            suspendAudibleTabs={suspendAudibleTabs!}
            excludeList={excludeList!}
            excludeTabsFromList={excludeTabsFromList!}
            handdleKeepTabsInMemory={handdleKeepTabsInMemory}
            handdleMaxTabsInMemory={handdleMaxTabsInMemory}
            handdleSuspendAtStartup={handdleSuspendAtStartup}
            handdleSuspendAudibleTabs={handdleSuspendAudibleTabs}
            handdleExcludeTabs={handdleExcludeTabs}
            handdleDeleteExcludeItem={handdleDeleteExcludeItem}
            handdleNewExcludeItem={handdleNewExcludeItem}
            domainExcluded={domainExcluded}
            setDomainExcluded={setDomainExcluded}
        />
    );
};

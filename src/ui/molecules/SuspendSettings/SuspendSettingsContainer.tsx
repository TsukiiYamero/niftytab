import { SettingsContext, SettingsDispatchContext } from '@/contexts/Settings';
import { SettingsActions } from '@/contexts/Settings/settings.types';
import { isValidUrl } from '@/utils';
import { type ChangeEvent, useContext, useState } from 'react';
import { SuspendSettingsView } from './SuspendSettingsView';

export const SuspendSettingsContainer = () => {
    const {
        temporarySettings: {
            recentTabsLimit,
            neverSuspendAudibleTabs,
            suspendTabsAtStartup,
            excludeList,
            excludeTabsFromList,
            suspendTabsAfter
        }
    } = useContext(SettingsContext);
    const { temporarySettingsDispatch } = useContext(SettingsDispatchContext);
    const [domainExcluded, setDomainExcluded] = useState('');
    const [isValidNumberOfTime, setIsValidNumberOfTime] = useState(true);
    const [isValidRecentTabsLimit, setIsValidRecentTabsLimit] = useState(true);

    const tabsOptions = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '7', value: 7 }, { label: '9', value: 9 }, { label: '11', value: 11 }];
    const listMinutes = [{ label: '2 Min', value: '2' }, { label: '3 Min', value: '3' }, { label: '5 Min', value: '5' }, { label: '10 Min', value: '10' }, { label: '15 Min', value: '15' }, { label: '30 Min', value: '30' }, { label: '45 Min', value: '45' }, { label: '1 Hour', value: '60' }, { label: '3 Hours', value: '180' }, { label: '5 Hours', value: '300' }];

    const handdleMaxTabsInMemory = (value: number) => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { recentTabsLimit: value }
        });
    };

    const handdleSuspendAtStartup = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { suspendTabsAtStartup: !suspendTabsAtStartup }
        });
    };

    const handdleSuspendAudibleTabs = () => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { neverSuspendAudibleTabs: !neverSuspendAudibleTabs }
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

    const handleSuspendTabsAfter = (value: number) => {
        temporarySettingsDispatch({
            type: SettingsActions.updateSettings, payload: { suspendTabsAfter: value }
        });
    };

    // Handle Selects
    const OnChangeSelectSuspendTime = (e: ChangeEvent<HTMLSelectElement>) => {
        handleSuspendTabsAfter(Number(e.target.value));

        setIsValidNumberOfTime(!!e.target.value);
    };

    const onChangeSelectRecentTabsLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        handdleMaxTabsInMemory(Number(e.target.value));

        setIsValidRecentTabsLimit(!!e.target.value);
    };

    return (
        <SuspendSettingsView
            listNumbersTabsInMemory={tabsOptions}
            keepTabsInMemory={true}
            recentTabsLimit={recentTabsLimit!}
            suspendTabsAtStartup={suspendTabsAtStartup!}
            suspendAudibleTabs={neverSuspendAudibleTabs!}
            excludeList={excludeList!}
            excludeTabsFromList={excludeTabsFromList!}
            listMinutes={listMinutes}
            suspendTabsAfter={suspendTabsAfter!}
            onChangeSelectRecentTabsLimit={onChangeSelectRecentTabsLimit}
            handdleSuspendAtStartup={handdleSuspendAtStartup}
            handdleSuspendAudibleTabs={handdleSuspendAudibleTabs}
            handdleExcludeTabs={handdleExcludeTabs}
            handdleDeleteExcludeItem={handdleDeleteExcludeItem}
            handdleNewExcludeItem={handdleNewExcludeItem}
            OnChangeSelectSuspendTime={OnChangeSelectSuspendTime}
            domainExcluded={domainExcluded}
            setDomainExcluded={setDomainExcluded}
            // selects
            isValidNumberOfTime={isValidNumberOfTime}
            isValidRecentTabsLimit={isValidRecentTabsLimit}
        />
    );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { SettingsContext, SettingsDispatchContext } from '@/contexts/Settings';
import { SettingsActions } from '@/contexts/Settings/settings.types';
import { isValidUrl } from '@/utils';
import { Checkbox, CheckboxGroup, Chip, Input, Select, SelectItem } from '@nextui-org/react';
import { IconCheck } from '@tabler/icons-react';
import { useContext, useState } from 'react';

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
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>
                    Suspend tabs
                </p>
                <Checkbox isSelected={keepTabsInMemory} onChange={handdleKeepTabsInMemory} className='w-full'>
                    <div className='flex items-center gap-2'>
                        <p className={`text-[${keepTabsInMemory ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)] w-[132px]`}>
                            Keep maximum of
                        </p>

                        <Select
                            aria-label='Select a number of tabs to keep'
                            className="max-w-[70px]"
                            size='sm'
                            defaultSelectedKeys={[`${maxTabsinMemory}`]}
                            onChange={(e) => {
                                handdleMaxTabsInMemory(Number(e.target.value));
                            }}
                        >
                            {
                                tabsOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>

                        <p className={`text-[${keepTabsInMemory ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                            recent tabs in memory and suspend the rest
                        </p>
                    </div>

                </Checkbox>

                <Checkbox isSelected={suspendTabsAtStartup} onChange={handdleSuspendAtStartup}>
                    <p className={`text-[${suspendTabsAtStartup ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                        Suspend tabs at startup
                    </p>
                </Checkbox>
            </div >

            <div className='flex flex-col gap-2'>

                <p className='text-[length:var(--font-size-standard)] text-[--neutral-color-alt-primary]'>
                    Exclusions
                </p>

                <Checkbox isSelected={suspendAudibleTabs} onChange={handdleSuspendAudibleTabs}>
                    <p className={`text-[${suspendAudibleTabs ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                        Never suspend tabs that are playing a video or audio
                    </p>
                </Checkbox>

                <Checkbox isSelected={excludeTabsFromList} onChange={handdleExcludeTabs}>
                    <p className={`text-[${excludeTabsFromList ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                        Never suspend tabs from this list
                    </p>
                </Checkbox>

                <div className='flex flex-wrap gap-2 min-h-[60px] p-3 rounded-md border-1 border-[--primary-color-45] relative'>

                    {!excludeTabsFromList && <div className='absolute w-full left-0 top-0 h-full z-10 bg-[#18181b] opacity-80'></div>}

                    {
                        excludeList?.map((exclude, i) => (
                            <Chip
                                key={exclude}
                                onClose={() => { handdleDeleteExcludeItem(i); }}
                            >
                                {exclude}
                            </Chip>
                        ))
                    }

                    <div className='w-[290px]'>
                        <Input
                            value={domainExcluded}
                            onChange={(e) => { setDomainExcluded(e.target.value); }}
                            size='sm'
                            placeholder="https://www.youtube.com"
                            endContent={
                                <button onClick={handdleNewExcludeItem} className='rounded-full bg-[#183b2a]'>
                                    <IconCheck className='w-[20px] h-[20px] text-success-600' />
                                </button>
                            }
                        />
                    </div>
                </div>

            </div>
        </div >
    );
};

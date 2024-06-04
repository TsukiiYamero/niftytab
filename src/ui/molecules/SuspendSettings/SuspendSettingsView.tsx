import { Checkbox, Chip, Input, Select, SelectItem, Tooltip } from '@nextui-org/react';

import { IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';
import type { ChangeEvent } from 'react';

interface SuspendSettingsViewProps {
    listNumbersTabsInMemory: Array<{ value: number, label: string }>,
    listMinutes: Array<{ value: string, label: string }>,
    keepTabsInMemory: boolean,
    maxTabsinMemory: number,
    suspendTabsAtStartup: boolean,
    suspendAudibleTabs: boolean,
    excludeList: string[],
    excludeTabsFromList: boolean,
    domainExcluded: string,
    suspendTabsAfter: number,
    handdleKeepTabsInMemory: () => void,
    handdleSuspendAtStartup: () => void,
    handdleSuspendAudibleTabs: () => void,
    handdleExcludeTabs: () => void,
    handdleNewExcludeItem: () => void,
    handleSuspendTabsAfter: (value: number) => void,
    handdleDeleteExcludeItem: (index: number) => void,
    handdleMaxTabsInMemory: (value: number) => void,
    setDomainExcluded: (value: string) => void
}

export const SuspendSettingsView: React.FC<SuspendSettingsViewProps> = ({
    listNumbersTabsInMemory,
    listMinutes,
    keepTabsInMemory,
    maxTabsinMemory,
    suspendTabsAtStartup,
    suspendAudibleTabs,
    excludeList,
    excludeTabsFromList,
    suspendTabsAfter,
    handdleKeepTabsInMemory,
    handdleMaxTabsInMemory,
    handdleSuspendAtStartup,
    handdleSuspendAudibleTabs,
    handdleExcludeTabs,
    handdleDeleteExcludeItem,
    handdleNewExcludeItem,
    domainExcluded,
    setDomainExcluded,
    handleSuspendTabsAfter
}: SuspendSettingsViewProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>
                    Suspend tabs
                </p>

                <div className='flex items-center gap-2 pl-[7px]'>
                    <p className='text-[length:var(--font-size-tiny)] text-foreground'>
                        Suspend Tabs after
                    </p>

                    <Select
                        aria-label='Select a number of time to suspend tabs'
                        className="max-w-[126px]"
                        size='sm'
                        defaultSelectedKeys={[`${suspendTabsAfter}`]}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            handleSuspendTabsAfter(Number(e.target.value));
                        }}
                    >
                        {
                            listMinutes.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>

                <Checkbox isSelected={keepTabsInMemory} onChange={handdleKeepTabsInMemory} className='w-full'>
                    <div className='flex items-center gap-2'>
                        <p className={`text-[${keepTabsInMemory ? 'foreground' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)] w-[132px]`}>
                            Keep maximum of
                        </p>

                        <Select
                            aria-label='Select a number of tabs to keep'
                            className="max-w-[70px]"
                            size='sm'
                            defaultSelectedKeys={[`${maxTabsinMemory}`]}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                handdleMaxTabsInMemory(Number(e.target.value));
                            }}
                        >
                            {
                                listNumbersTabsInMemory.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>

                        <p className={`text-[${keepTabsInMemory ? 'foreground' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                            recent tabs in memory and suspend the rest
                        </p>
                    </div>

                </Checkbox>

                <Checkbox isSelected={suspendTabsAtStartup} onChange={handdleSuspendAtStartup}>
                    <p className={`text-[${suspendTabsAtStartup ? 'foreground' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                        Suspend tabs at startup
                    </p>
                </Checkbox>
            </div >

            <div className='flex flex-col gap-2'>

                <p className='text-[length:var(--font-size-standard)] text-[--neutral-color-alt-primary]'>
                    Exclusions
                </p>

                <Checkbox isSelected={suspendAudibleTabs} onChange={handdleSuspendAudibleTabs}>
                    <p className={`text-[${suspendAudibleTabs ? 'foreground' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                        Never suspend tabs that are playing a video or audio
                    </p>
                </Checkbox>

                <Checkbox isSelected={excludeTabsFromList} onChange={handdleExcludeTabs}>
                    <p className={`text-[${excludeTabsFromList ? 'foreground' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
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

                    <div className='w-[300px] flex items-center gap-2'>
                        <Input
                            value={domainExcluded}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setDomainExcluded(e.target.value); }}
                            size='sm'
                            placeholder="https://www.youtube.com"
                            endContent={
                                <Tooltip size='md' content="Click to Save">
                                    <button onClick={handdleNewExcludeItem} className='rounded-full bg-[#183b2a]'>
                                        <IconDeviceFloppy className='w-[20px] h-[20px] text-success-600' />
                                    </button>
                                </Tooltip>
                            }
                        />

                        <Tooltip size='md' content="Just links allowed ex: https://www.example.com">
                            <IconInfoCircle />
                        </Tooltip>
                    </div>
                </div>

            </div>
        </div >
    );
};

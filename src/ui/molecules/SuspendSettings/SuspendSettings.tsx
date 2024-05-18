/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, CheckboxGroup, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';

export const SuspendSettings = () => {
    const [isSelected, setIsSelected] = useState(true);

    const tabsOptions = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '7', value: 7 }, { label: '9', value: 9 }, { label: '11', value: 11 }];

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>
                    Suspend tabs
                </p>
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected} className='w-full'>
                    <div className='flex items-center gap-2'>
                        <p className={`text-[${isSelected ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)] w-[132px]`}>
                            Keep maximum of
                        </p>

                        <Select
                            aria-label='Select a number of tabs to keep'
                            className="max-w-[70px]"
                            size='sm'
                            defaultSelectedKeys={['3']}
                        >
                            {
                                tabsOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))
                            }
                        </Select>

                        <p className={`text-[${isSelected ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                            recent tabs in memory and suspend the rest
                        </p>
                    </div>

                </Checkbox>

                <Checkbox value="sydney">
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-tiny)]'>
                        In Progress
                    </p>
                </Checkbox>
            </div>

            <div className='flex flex-col gap-2'>

                <p className='text-[length:var(--font-size-standard)] text-[--neutral-color-alt-primary]'>
                    Exclusions
                </p>

                <CheckboxGroup
                    aria-label='exlude tabs from being suspended'
                >
                    <Checkbox value="media">
                        <p className={`text-[${isSelected ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                            Never suspend tabs that are playing a video or audio
                        </p>
                    </Checkbox>
                    <Checkbox value="custom">
                        <p className={`text-[${isSelected ? '--primary-color' : '--neutral-color-alt-primary'}] text-[length:var(--font-size-tiny)]`}>
                            Never suspend tabs from this list
                        </p>
                    </Checkbox>
                </CheckboxGroup>

                <div className='flex h-[70px] p-3 rounded-md border-1 border-[--primary-color-45]'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-tiny)]'>
                        https://gmail.com
                    </p>
                </div>

                <div className='flex h-[70px] p-3 rounded-md border-1 border-[--primary-color-45]'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-tiny)]'>
                        https://gmail.com
                    </p>
                </div>

                <div className='flex h-[70px] p-3 rounded-md border-1 border-[--primary-color-45]'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-tiny)]'>
                        https://gmail.com
                    </p>
                </div>

                <div className='flex h-[70px] p-3 rounded-md border-1 border-[--primary-color-45]'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-tiny)]'>
                        https://gmail.com
                    </p>
                </div>

            </div>
        </div>
    );
};

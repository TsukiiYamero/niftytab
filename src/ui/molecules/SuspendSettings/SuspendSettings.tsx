import { Checkbox, CheckboxGroup, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';

export const SuspendSettings = () => {
    const [selected, setSelected] = useState('london');

    const tabsOptions = [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '7', value: 7 }, { label: '9', value: 9 }, { label: '11', value: 11 }];

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
                <p className='text-[length:var(--font-size-standard)] text-[--neutral-color-alt-primary]'>
                    Suspend tabs
                </p>

                <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    defaultValue='keep'
                >
                    <Radio value="keep" className='w-full'>
                        <div className='flex items-center gap-2'>
                            <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)] w-[132px]'>
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

                            <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)]'>
                                recent tabs in memory and suspend the rest
                            </p>
                        </div>

                    </Radio>
                    <Radio value="sydney">
                        <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)]'>
                            In Progress
                        </p></Radio>
                </RadioGroup>
            </div>

            <div className='flex flex-col gap-2'>

                <p className='text-[length:var(--font-size-standard)] text-[--neutral-color-alt-primary]'>
                    Exclusions
                </p>

                <CheckboxGroup
                    aria-label='exlude tabs from being suspended'
                    defaultValue={['buenos-aires']}
                >
                    <Checkbox value="media">
                        <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)]'>
                            Never suspend tabs that are playing a video or audio
                        </p>
                    </Checkbox>
                    <Checkbox value="custom">
                        <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)]'>
                            Never suspend tabs from this list
                        </p>
                    </Checkbox>
                </CheckboxGroup>

                <div className='flex h-[70px] p-3 rounded-md border-1 border-[--primary-color-45]'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-common)]'>
                        https://gmail.com
                    </p>
                </div>

            </div>
        </div>
    );
};

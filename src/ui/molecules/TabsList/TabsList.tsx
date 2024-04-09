/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from 'react';

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    type ChipProps,
    SortDescriptor,
    Spinner
} from '@nextui-org/react';
import { useCallback, useState } from 'react';

import { useGetAllTabs } from '@/customHooks/tabs';
import { IconCpu, IconDotsVertical, IconPanoramaHorizontal } from '@tabler/icons-react';
import { successColorIfTrue } from '@/utils';

const StatusColorMap: Record<string, ChipProps['color']> = {
    active: 'success',
    inactive: 'default'
};

export const TabsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { tabs, loading } = useGetAllTabs();

    const renderCell = useCallback((value: string) => {

    }, []);

    return (
        <Table
            isHeaderSticky
            aria-label="Show resources consumption"
            classNames={{
                table: 'min-h-[200px]',
                base: 'max-h-[270px]  max-w-[580px]'
            }}
        >
            <TableHeader>
                <TableColumn key="tabs" allowsSorting className='text-[length:var(--font-size-table-content)]'>
                    Tabs
                </TableColumn>

                <TableColumn key="gpu" allowsSorting width={60}>
                    <div className='inline-flex items-center gap-1'>
                        <IconCpu className="h-4 w-4 text-[--neutral-color-primary]" />
                        <span className='text-[length:var(--font-size-table-content)] font-medium'>GPU</span>
                    </div>
                </TableColumn>

                <TableColumn key="ram" allowsSorting width={60}>
                    <div className='inline-flex items-center gap-1'>
                        <IconPanoramaHorizontal className="h-4 w-4 text-[--neutral-color-primary]" />
                        <span className='text-[length:var(--font-size-table-content)] font-medium'>Ram</span>
                    </div>
                </TableColumn>

                <TableColumn key="status" allowsSorting width={66} className='text-[length:var(--font-size-table-content)]'>
                    Status
                </TableColumn>

                <TableColumn key="actions" width={60} className='text-[length:var(--font-size-table-content)]'>
                    Actions
                </TableColumn>
            </TableHeader>

            <TableBody
                isLoading={loading}
                items={tabs}
                loadingContent={<Spinner label="Loading..." />}

            >
                {
                    (item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className='flex gap-2 max-w-[204px] items-center overflow-hidden'>
                                    <img className='h-4 w-4' src={`${item.favIconUrl}`} alt={item.title} />

                                    <div className='flex flex-col overflow-hidden'>
                                        <p title={item.title} className='text-[length:var(--font-size-table-content)] font-medium text-ellipsis overflow-hidden whitespace-nowrap'>
                                            {item.title}
                                        </p>
                                        <small title={item.url} className='text-[length:9px] text-[--neutral-color-alt-primary] text-ellipsis overflow-hidden whitespace-nowrap'>
                                            {item.url}
                                        </small>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className={`${successColorIfTrue(item.discarded)} text-[length:var(--font-size-table-content)]`}>
                                1%
                            </TableCell>
                            <TableCell className={`${successColorIfTrue(item.discarded)} text-[length:var(--font-size-table-content)]`}>
                                100mb
                            </TableCell>
                            <TableCell className={`${successColorIfTrue(item.discarded)} text-[length:var(--font-size-table-content)]`}>
                                {
                                    item.discarded ? 'Suspended' : 'Active'
                                }
                            </TableCell>
                            <TableCell>
                                <div className="relative flex justify-end items-center gap-2">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button isIconOnly size="sm" variant="light">
                                                <IconDotsVertical className="h-4 w-4 text-[--neutral-color-primary]" />
                                            </Button>
                                        </DropdownTrigger>

                                        <DropdownMenu>
                                            <DropdownItem>Suspend</DropdownItem>
                                            <DropdownItem>Unsuspend</DropdownItem>
                                            <DropdownItem>Never suspend </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </TableCell>

                        </TableRow>
                    )
                }
            </TableBody>
        </Table >
    );
};

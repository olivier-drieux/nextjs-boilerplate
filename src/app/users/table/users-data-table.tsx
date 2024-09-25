'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState, useQueryStates } from 'nuqs';
import { useState } from 'react';
import { DataTablePagination } from '../../../components/ui/data-table/data-table-pagination';
import { DataTableViewOptions } from '../../../components/ui/data-table/data-table-view-options';
import { Input } from '../../../components/ui/input';
import { CreateUserButton } from '../create-user-button';
import { getPaginatedUsers } from '../get-users-query';
import { columns } from './columns';

interface UsersDataTableProps {
    countRows: number;
}

export function UsersDataTable({ countRows }: UsersDataTableProps) {
    const [rowSelection, setRowSelection] = useState({});

    const [pagination, setPagination] = useQueryStates({
        pageIndex: parseAsInteger.withDefault(1),
        pageSize: parseAsInteger.withDefault(10),
    });
    const [search, setSearch] = useQueryState('search');

    const { data } = useSuspenseQuery({
        queryKey: ['users', pagination],
        queryFn: () =>
            getPaginatedUsers({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                search: search ?? undefined,
            }),
    });

    // TODO: https://nuqs.47ng.com/playground/pagination
    const table = useReactTable({
        data: data,
        columns,
        pageCount: countRows / pagination.pageSize,
        state: {
            rowSelection,
            pagination: {
                // React Table uses 0-based index
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            },
            globalFilter: search,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setSearch,
        onPaginationChange: setPagination,
    });

    return (
        <div>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Global filter...'
                    value={(table.getState().globalFilter || '') as string}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className='max-w-sm'
                />
                <div className='ml-auto flex gap-4'>
                    <CreateUserButton />
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <div className='rounded-md border mb-4'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}

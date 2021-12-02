import React, { useState, useEffect } from 'react';

import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { TableToolbar } from '@redhat-cloud-services/frontend-components';
import { Button, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';

export const NamespaceList = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ namespaceData, setNamespaceData ] = useState()

    const fetchData = () => {
        fetch(`/namespaces`)
        .then(res => res.json())
        .then(response => {
            console.log(response);
            setNamespaceData(response.namespaces);
            setIsLoaded(true);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchData()
    }, []);

    const reloadData = () => {
        setIsLoaded(false);
        fetchData();
    }

    const reserveButton = (
        <Button
            onClick={() => {
                fetch(`/namespaces`, {
                    method: 'POST'
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    reloadData();
                })
                .catch(error => console.log(error))
            }}
        >
            Reserve
        </Button>
    );

    const extendAction = (namespace) => {
        fetch(`/namespaces/${namespace}`, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            reloadData();
        })
        .catch(error => console.log(error))
    }

    const nsActions = [
        {
            title: 'Deploy Apps',
            onClick: (rowId) => console.log('Clicked deploy apps on row ', rowId)
        },
        {
            title: 'Extend',
            onClick: (event, rowId, rowData) => console.log('Clicked deploy apps on row ', rowId)
        },
        {
            title: 'Release',
            onClick: (rowId) => console.log('Clicked deploy apps on row ', rowId)
        }
    ]

    const columns = ['Name', 'Reserved', 'Env Status', 'Apps Ready', 'Requester', 'Expires']

    return (
        <React.Fragment>
            <TableToolbar>
                <ToolbarGroup>
                    <ToolbarItem>
                        {reserveButton}
                    </ToolbarItem>
                </ToolbarGroup>
            </TableToolbar>
            { isLoaded ?      
                <TableComposable aria-label='Namespace table'>
                    <Thead>
                        <Tr>
                            {columns.map(column => <Th>{column}</Th>)}
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {namespaceData.map((ns, index) => 
                            <Tr key={ns.name}>
                                <Td>
                                    {ns.name}
                                </Td>
                                <Td>
                                    {ns.reserved.toString()}
                                </Td>
                                <Td>
                                    {ns.status}
                                </Td>
                                <Td>
                                    {ns.apps}
                                </Td>
                                <Td>
                                    {ns.requester}
                                </Td>
                                <Td>
                                    {ns.expires_in}
                                </Td>
                                <Td
                                    actions={{
                                        items: nsActions,
                                        disable: ns.reserved
                                    }}
                                />
                            </Tr>
                        )}
                    </Tbody>
                </TableComposable>
            : <div> Gathering namespaces... </div>
            }
        </React.Fragment>
    );
};
import React, { useState, useEffect } from 'react';

import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';

export const NamespaceList = () => {
    const [ loadingData, setLoadingData ] = useState(true);
    const [ namespaceData, setNamespaceData ] = useState({})

    const fetchData = () => {
        fetch(`/namespaces`)
        .then(res => res.json())
        .then(response => {
            console.log(response);
            setNamespaceData(response);
            console.log(namespaceData);
        })
        .catch(error => console.log(error));

        setLoadingData(false);
    };

    useEffect(() => {
        if (loadingData) {
            fetchData();
        }
    }, []);

    const columns = ['Name', 'Reserved', 'Env Status', 'Apps Ready', 'Requester', 'Expires']

    return (
        <TableComposable aria-label='Namespace table'>
            <Thead />
                <Tr>
                    {columns.map(column => <Th>{column}</Th>)}
                </Tr>
            <Tbody />
        </TableComposable>
    );
};
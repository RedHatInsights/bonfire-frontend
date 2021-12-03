import React, { useState } from 'react';

import { TableComposable, Thead, Tr, Th } from '@patternfly/react-table';
import NamespaceTableBody from '../Components/NamespaceTable/NamespaceTableBody';

export const NamespaceList = ({ namespaces }) => {
    const [ isLoaded, setIsLoaded ] = useState(true);
    const [ namespaceData, setNamespaceData ] = useState(namespaces);

    const fetchData = () => {
        console.log("fetching data")
        fetch(`/namespaces`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setNamespaceData(data.namespaces);
            setIsLoaded(true);
        })
        .catch(error => console.log(error));
    };

    const reloadData = () => {
        setIsLoaded(false);
        fetchData();
    }
    
    const columns = ['Name', 'Reserved', 'Env Status', 'Apps Ready', 'Requester', 'Expires']

    return (
        <React.Fragment>
            { isLoaded && namespaceData ?      
                <TableComposable aria-label='Namespace table'>
                    <Thead>
                        <Tr>
                            {columns.map(column => <Th>{column}</Th>)}
                        </Tr>
                    </Thead>
                    <NamespaceTableBody namespaceData={namespaceData} reloadData={reloadData}/>
                </TableComposable>
            : <div> Gathering namespaces... </div>
            }
        </React.Fragment>
    );
};
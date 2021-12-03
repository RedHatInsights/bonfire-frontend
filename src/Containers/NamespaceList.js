import React, { useState, useEffect } from 'react';

import { TableComposable, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { AppModal } from './AppModal';


export const NamespaceList = () => {
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ namespaceData, setNamespaceData ] = useState();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalNamespace, setModalNamespace ] = useState(null)

    const handleAlert = (variant, title, description) => {
        dispatch(
            addNotification({
                variant: variant,
                title: title,
                description: description,
            })
        );
    };

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

    useEffect(() => {
        fetchData()
    }, []);

    const reloadData = () => {
        setIsLoaded(false);
        fetchData();
    }

    const deployAction = (namespace) => {
        setModalNamespace(namespace)
        setIsModalOpen(true)
    }

    const extendAction = (namespace) => {
        handleAlert(
            "info",
            `Extending the reservation for namespace ${namespace}`
        )
        fetch(`/namespaces/${namespace}`, {
            method: 'PUT'
        })
        .then(setTimeout(() => reloadData(), 2000))
        .catch(error => console.log(error))
    }

    const releaseAction = (namespace) => {
        handleAlert(
            "info",
            `Releasing the reservation for namespace ${namespace}`
        )
        fetch(`/namespaces/${namespace}`, {
            method: 'DELETE'
        })
        .then(setTimeout(() => reloadData(), 3000)) // Figure out better delay
        .catch(error => console.log(error))
    }

    const nsActions = namespace => [
        {
            title: 'Deploy Apps',
            onClick: () => {
                deployAction(namespace);
            }
        },
        {
            title: 'Extend',
            onClick: () => {
                extendAction(namespace);
            }
        },
        {
            title: 'Release',
            onClick: () => {
                releaseAction(namespace);
            }
        }
    ]

    const columns = ['Name', 'Reserved', 'Env Status', 'Apps Ready', 'Requester', 'Expires']
    
    return (
        <React.Fragment>
            { isLoaded ?      
                <TableComposable aria-label='Namespace table'>
                    <Thead>
                        <Tr>
                            {columns.map(column => <Th>{column}</Th>)}
                            <Th />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {namespaceData.map(ns => 
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
                                    // Upgrade to ActionColumn
                                    actions={{
                                        items: nsActions(ns.name),
                                        disable: !ns.reserved
                                    }}
                                />
                            </Tr>
                        )}
                    </Tbody>
                </TableComposable>
            : <div> Gathering namespaces... </div>
            }
            <React.Fragment>
                <AppModal
                    isOpen={isModalOpen}
                    onClose={() => {setIsModalOpen(false)}}
                    namespace={modalNamespace}
                />
            </React.Fragment>
        </React.Fragment>
    );
};
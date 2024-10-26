import React, { useMemo, useState } from 'react'
import { IObject } from '../../interfaces/interfaces.ts'
import { SListContainer, SListItem } from '../../styled.ts'

interface ObjectListProps {
    objects: IObject[]
    selectedObjectId: number | null
    onSelectObject: (id: number) => void
}

export const ObjectList: React.FC<ObjectListProps> = ({ objects, selectedObjectId, onSelectObject }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const selectedObjects = useMemo(() => {
        return objects.filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )}, [objects, searchTerm])

    return (
        <>
            <input
                type="text"
                placeholder="Поиск по авто"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SListContainer>
                {selectedObjects.map(object => (
                    <SListItem
                        key={object.id}
                        isSelected={object.id === selectedObjectId}
                        onClick={() => onSelectObject(object.id)}
                    >
                        {object.name}
                    </SListItem>
                ))}
            </SListContainer>
        </>

    )
}
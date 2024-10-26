import React, { useCallback, useState } from 'react'
import { mockObjectsData } from './mock.ts'
import { SContainer, SSidebar } from './styled.ts'
import { ObjectList } from './components/Objects/ObjectList.tsx'
import { Map } from './components/Map/Map.tsx'

const App: React.FC = () => {
    const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null)

    const handleSelectObject = useCallback((id: number) => {
        setSelectedObjectId(id)
    }, [setSelectedObjectId])

    return (
        <SContainer>
            <SSidebar>
                <ObjectList
                    objects={mockObjectsData}
                    selectedObjectId={selectedObjectId}
                    onSelectObject={handleSelectObject}
                />
            </SSidebar>
            <Map
                objects={mockObjectsData}
                selectedObjectId={selectedObjectId}
                onSelectObject={handleSelectObject}
            />
        </SContainer>
    )
}

export default App

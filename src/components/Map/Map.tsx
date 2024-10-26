import React, { useCallback, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// @ts-ignore не знаю что с этим импортом, он сломался
import L from 'leaflet/dist/leaflet.js'
import selectedIcon from '../../../src/assets/selectedIcon.svg'
import defaultIcon from '../../../src/assets/defaultIcon.svg'
import styled from 'styled-components'
import { IObject } from '../../interfaces/interfaces.ts'
import {LatLngExpression} from "leaflet";

interface MapProps {
    objects: IObject[]
    selectedObjectId: number | null
    onSelectObject: (id: number) => void
}

const defaultMapCenter = [50, 10] as LatLngExpression
const defaultZoom = 3
const defaultIconSize = [24, 24]
const selectedIconSize = [30, 30]

const SMapContainer = styled(MapContainer)`
    height: 100%;
    width: 100%;
    .leaflet-control { display: none }
`

// TODO добавить размер иконок в зависимости от зума и Tooltip для Marker

export const Map: React.FC<MapProps> = ({ objects, selectedObjectId, onSelectObject }) => {

    const selectedObject = useMemo(() => {
        return objects.find(obj => obj.id === selectedObjectId)
    }, [objects, selectedObjectId])

    const objectMarks = useMemo(() => {
        return objects.map(object => (
            <Marker
                key={object.id}
                position={[object.latitude, object.longitude]}
                icon={L.icon({
                    iconUrl: object.id === selectedObjectId ? selectedIcon : defaultIcon,
                    iconSize: object.id === selectedObjectId ? selectedIconSize : defaultIconSize,
                })}
                eventHandlers={{
                    click: () => onSelectObject(object.id),
                }}
            >
            </Marker>
        ));
    }, [objects, selectedObjectId, selectedIcon, onSelectObject]);

    const CenterMapOnSelectedObject = useCallback(() => {
        const map = useMap()
        if (selectedObject) {
            map.setView([selectedObject.latitude, selectedObject.longitude], 5)
        }
        return null
    }, [selectedObject])

    return (
        <SMapContainer center={defaultMapCenter} zoom={defaultZoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {objectMarks}
            <CenterMapOnSelectedObject />
        </SMapContainer>
    )
}

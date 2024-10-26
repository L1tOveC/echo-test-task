import styled from "styled-components";

export const SContainer = styled.div`
  display: flex;
  height: 100vh;
`

export const SSidebar = styled.div`
    width: 30%;
    overflow-y: auto;
    box-sizing: border-box;
    border: 1px solid #47cee6 !important;
    padding: 20px;
`

export const SListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const SListItem = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#6dabed' : '')};
  border-radius: 4px;
  margin: 5px;
  
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#6dabed' : '#4d9bef')}
  }
`

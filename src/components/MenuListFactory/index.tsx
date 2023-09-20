import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'
import { CleanButton, ButtonAdd } from '../Button'
import { RiCloseFill } from 'react-icons/ri'
import Accordion from '../Accordion'

const List = styled.ul`
  margin: 0;
  padding: 0.4rem;
  list-style: none;
`

const Item = styled.li`
  padding: 0.2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Overflow = styled.span`
  overflow-x: auto;
`

const RemoveButton = styled(CleanButton)`
  width: auto;
  padding: 0.3rem;
`

const NewItemWrapper = styled(Box)`
  display: flex;
  align-items: center;
`

const NewItemInput = styled.input<{ error: boolean }>`
  border-radius: 0.5rem;
  margin-right: 0.4rem !important;
  ${({ error, theme }) => (error ? `border: 2px solid ${theme.red2} !important;` : '')}
`

export default function MenuListFactory({
  title,
  placeholder,
  isValidItem,
  items,
  setItems
}: {
  title: string
  setItems: (callback: any) => void
  isValidItem: (item: { title: string, address: string } ) => boolean
  items: any[]
  placeholder?: string
}) {
  const [newItemTitle, setNewItemTitle] = useState<string>('')
  const [newItemAddress, setNewItemAddress] = useState<string>('')
  
  const [itemError, setItemError] = useState<boolean>(false)

  const onRemove = (targetIndex: number) => {
    setItems((prevItems: any[]) => prevItems.filter((_, index) => index !== targetIndex))
  }

  const onNewItemTitleChange = (event: any) => {
    setItemError(false)
    setNewItemTitle(event.target.value)
  }
  const onNewItemAddressChange = (event: any) => {
    setItemError(false)
    setNewItemAddress(event.target.value)
  }

  const onAdd = () => {
    if (isValidItem({title: newItemTitle, address: newItemAddress})) {
      setItems((prevItems: any[]) => [...prevItems, { title: newItemTitle, address: newItemAddress }])
      setNewItemTitle('')
      setNewItemAddress('')
    } else {
      setItemError(true)
    }
  }

  return (
    <Accordion title={title}>
      <List>
        {items.map((item, index) => (
          <Item key={index}>
            <Overflow>{item.title}</Overflow>
            <Overflow>({item.address})</Overflow>
            <RemoveButton type="button" onClick={() => onRemove(index)} title="Remove item">
              <RiCloseFill />
            </RemoveButton>
          </Item>
        ))}
      </List>

      <NewItemWrapper>
        <div>Title:</div>
        <NewItemInput error={itemError} type="text" onChange={onNewItemTitleChange} />
        <div>Address:</div>
        <NewItemInput error={itemError} type="text" onChange={onNewItemAddressChange} /> 
        <ButtonAdd onClick={onAdd} disabled={!newItemTitle || !newItemAddress} />
      </NewItemWrapper>
    </Accordion>
  )
}

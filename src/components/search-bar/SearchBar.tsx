import React, { useCallback, useRef, useState } from 'react'

import { Input, InputGroup } from 'rsuite'
import ClearIcon from '@rsuite/icons/Close'

import debounce from 'lodash.debounce'

import { ObjectType } from '../../api/const'

import './SearchBar.css'

type Item = {
    type: ObjectType,
    id: string
}

type SearchBarProps = {
    foundItemsHandler: (items: Item[]) => void,
    // types: string[],
}


const SearchBar: React.FC<SearchBarProps> = ({foundItemsHandler}) => {

    const [searchValue, setSearchValue] = useState<string>('')
    const [, setInputValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement | undefined>()

    const onSearchClear = () => {
        if (inputRef.current !== undefined)
            inputRef.current!.value = ''
        setSearchValue('')
    }

    const debounceSearch = useCallback(debounce((str: string) => {
        setSearchValue(str)
        console.log(str)
    }, 1000), [])

    const onChangeInput = (value: string) => {
        setInputValue(value)
        debounceSearch(value)
    }

    const SearchInputGroup = useCallback(() => (
        <InputGroup size={'lg'} inside>
            <Input placeholder={'Введите что хотите найти...'} onChange={onChangeInput} inputRef={inputRef}/>
            <InputGroup.Button onClick={onSearchClear}>
                <ClearIcon />
            </InputGroup.Button>
        </InputGroup>
    ), [])

    return (
        <div className={'search-bar'}>
            <SearchInputGroup />
        </div>
    )
}

export default SearchBar

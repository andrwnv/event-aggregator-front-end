import React, { useCallback, useRef, useState } from 'react'

import { Input, InputGroup } from 'rsuite'
import ClearIcon from '@rsuite/icons/Close'

import debounce from 'lodash.debounce'

import { ObjectType } from '../../api/const'

import './SearchBar.css'

type SearchBarProps = {
    searchValueCallback: (value: string) => void
    searchClearedCallback: () => void
}


const SearchBar: React.FC<SearchBarProps> = ({searchValueCallback, searchClearedCallback}) => {
    const [, setSearchValue] = useState<string>('')
    const [, setInputValue] = useState<string>('')

    const inputRef = useRef<HTMLInputElement | undefined>()

    const onSearchClear = () => {
        if (inputRef.current !== undefined)
            inputRef.current!.value = ''
        setSearchValue('')

        searchClearedCallback()
    }

    const debounceSearch = useCallback(debounce((str: string) => {
        setSearchValue(str)
        searchValueCallback(str)
    }, 700), [])

    const onChangeInput = (value: string) => {
        setInputValue(value)
        debounceSearch(value)
    }

    const SearchInputGroup = useCallback(() => (
        <InputGroup size={'lg'} inside>
            <Input placeholder={'Введите что хотите найти...'}
                   onChange={onChangeInput}
                   onPressEnter={() => {
                       onChangeInput(inputRef.current!.value)
                   }}
                   inputRef={inputRef}/>
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

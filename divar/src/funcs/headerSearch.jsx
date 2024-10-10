'use client'
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HeaderSearch = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const removeQueryParam = (name, value) => {
        const params = new URLSearchParams(searchParams)
        params.delete(name, value)
        router.replace(`${pathname}?${params.toString()}`)
    };

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    let searchInputValue = ''
    const handleChange = (e) => {
        searchInputValue = e.target.value;
        router.push(pathname + '?' + createQueryString('search', e.target.value.trim()))
        e.target.value == '' && removeQueryParam('search')

        // if (e.keyCode == 13 && e.target.value != '') {
        //     router.push(pathname + '?' + createQueryString('search', e.target.value.trim()))
        // } else {
        //     removeQueryParam('search')
        // }
    }

    return (
        <>
            <input
                className="p-2 bg-transparent w-full outline-none"
                type="search"
                name=""
                id="globalSearch"
                placeholder="جستجو در همه آگهی ها"
                onChange={handleChange}
                defaultValue={searchParams.get('search')}
            />
            <FaSearch className="m-2 fill-zinc-400" onClick={() => { router.push(pathname + '?' + createQueryString('search', searchInputValue.trim())) }} />
        </>
    );
}

export default HeaderSearch;
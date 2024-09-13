"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const CitySearch = () => {
    const [selectSity, setSelectSity] = useState([]);
    const [tempArr, setTempArr] = useState([]);

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredCities = tempArr.filter(data => 
            data.name?.toLowerCase().includes(query) && query !== ''
        );
        setSelectSity(filteredCities);
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/cities')
            .then(res => {
                setTempArr(res.data);
            })
            .catch(err => {
                console.error("Error fetching cities", err);
            });
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center w-full border-solid border-2 mt-8 rounded-md">
                <FaSearch className="mx-2 w-8 h-5 fill-zinc-400" />
                <input
                    type="search"
                    className="w-full py-3 px-2 border-0 outline-none"
                    placeholder="جست و جو شهر..."
                    id="search"
                    onChange={handleChange}
                />
            </div>
            <div className="bg-zinc-100 absolute w-full mt-2 rounded-lg">
                <ul>
                    {selectSity.map((data, index) => (
                        <li className="hover:bg-zinc-200" key={index}>
                            <Link href={'home/'+data.href} className="block p-2">{data.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CitySearch;
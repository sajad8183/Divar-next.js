const getAllCity = async () => {
    const data = await fetch('http://localhost:4000/api/cities', { cache: "no-store" });
    return data.json();
}

const getPopularCity = async () => {
    const data = await fetch('http://localhost:4000/api/cities/popular', { cache: "no-store" });    
    return data.json();
}


export {
    getAllCity,
    getPopularCity
};
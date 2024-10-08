
const staticUrl = 'https://divarapi.liara.run/v1/'

const getLocation = async () => {
    let getDataArr ;
    await fetch(`${staticUrl}location`, { cache: "no-store" })  
    .then(res=>{return res.json()})
    .then(data=>{
        getDataArr = data?.data.cities;
    })
    
    return getDataArr;
}

const getPopularCity = async () => {
    let popularCityArr 
    await getLocation().then(cities=>{
        popularCityArr = cities.filter(data=>{
            return data.popular=true
        })
    })
    return popularCityArr;
}

const getCityPost = async (categoryId,cityId) =>{
   // console.log(categoryID);
    
    // const data = categoryID != 'undefined' ? await fetch(`${staticUrl}post/${`?categoryId=${categoryID}`}&?city=${cityId}`,{cache:"no-store"})
    // : await fetch(`${staticUrl}post/?city=${cityId}`,{cache:"no-store"})
 //true   const data = await fetch(`${staticUrl}post/?city=${cityId}`,{cache:"no-store"})
 const data = await fetch(`https://divarapi.liara.run/v1/post/?categoryId=${categoryId}&city=${cityId}`,{cache:"no-store"})
    return data.json();
}


const getSidebarData = async () =>{
    const data = await fetch(`${staticUrl}category`)
    return data.json();
}

const getSinglePost = async (cityId) =>{
    const data = await fetch(`${staticUrl}post/${cityId}`,{cache:"no-store"})
    return data.json();
}
export {
    getPopularCity,
    getLocation,
    getCityPost,
    getSidebarData,
    getSinglePost
};
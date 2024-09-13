
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


export {
    getPopularCity,
    getLocation
};
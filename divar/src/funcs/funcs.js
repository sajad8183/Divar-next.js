const calcTime = (date) =>{
    const currentData = new Date();
    const createData = new Date(date)
    const difTime = currentData-createData;
    const hourTime = Math.floor(difTime/(60*60*1000));
    const dayTime = Math.floor(difTime/(24*60*60*1000));

    if(hourTime < 24){
        return ` ${hourTime} ساعت پیش`
    } else {
        return `${dayTime} روز پیش`
    }    
}

export {calcTime}
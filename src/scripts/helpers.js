const convertData = (data, type) => {
    const convertedData = data[type].map(item => {
        return {
            date: item.at(0),
            [type]: item.at(1)
        }
    })
    return convertedData;
}

export {
    convertData,
}
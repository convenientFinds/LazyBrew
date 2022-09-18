const axios = require("axios");

// const getHotel = () => {
//     const optionsHotels = {
//         method: 'GET',
//         url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
//         params: { query: 'seattle', locale: 'en_US', currency: 'USD' },
//         headers: {
//             'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
//             'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
//         }
//     }

//     axios.request(optionsHotels)
//         .then((response) => {
//             const optionsBrewery = {
//                 method: 'GET',
//                 url: `https://api.openbrewerydb.org/breweries?by_dist=${response.data.suggestions[1]['entities'][0]['latitude']}, ${response.data.suggestions[1]['entities'][0]['longitude']}&per_page=3`,
//             };
//             // console.log(response.data.suggestions[1]['entities'][0]['latitude'], response.data.suggestions[1]['entities'][0]['longitude'])
//             console.log(response.data.suggestions[1]['entities'], 'hotel response')
//             axios.request(optionsBrewery).then(function (response) {
//                 console.log(response.data, 'brewery response')
//                 // console.log(response.data.suggestions[0]['entities']);
//                 // console.log(response.data, 'this is working?')
//                 // console.log(response.data.length)
//             }).catch(function (error) {
//                 console.error(error);
//             });
//         }
//         )
// }

const getHotelList = (destinationID) => {
    // const optionsHotels = {
    //     method: 'GET',
    //     url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
    //     params: { query: city, locale: 'en_US', currency: 'USD'},
    //     headers: {
    //         'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
    //         'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    //     }
    // }
    // //TODO: Add next API to go from location name to destination ID, then query properties/list
    // //* This will give us a full list of hotels in the 

    // axios.request(optionsHotels)
    //     .then((response) => {
    //         console.log(response.data.suggestions[1])
    //     })
    
    
    let checkIn = '2022-09-19'
    let checkOut = '2022-09-22'
    
    
    const optionsProperties = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
            destinationId: destinationID,
            pageNumber: '1',
            pageSize: '10',
            checkIn: checkIn,
            checkOut: checkOut,
            adults1: '1',
            sortOrder: 'PRICE',
            locale: 'en_US',
            currency: 'USD'
        },
        headers: {
            'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    };

    axios.request(optionsProperties)
        .then((response) => {
            console.log(response.data.data.body.searchResults.results, 'response data')
            return response.data.data.body.searchResults.results
        })
        .catch((e) => {
            console.error(e, 'e')
        })


} 

//getHotelList('Los_Angeles')
export default getHotelList
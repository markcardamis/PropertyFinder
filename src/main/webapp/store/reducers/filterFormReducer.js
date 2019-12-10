// const savedFilterExample = {
//     'propertyZone': 4,
//     'propertyAreaMax': 'Sydney',
//     'propertyPriceMin': 1000,
//     'propertyPriceMax': 1000000,
//     'propertyPostCode': 55555,
// };

const filterFormReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_DATA':
            return action.payload;

        default: 
            return state;
    }
};

export default filterFormReducer;
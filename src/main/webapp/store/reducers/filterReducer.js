export const initialFilter = { 
                        zone: null,
                        area: [ 0, 20000 ],
                        streetFrontage: [ 0, 20 ],
                        price: [ 100000, 5000000 ],
                        priceM2: [ 1, 10000 ],
                        postCode: "",
                        priceLandvalue: [ 0, 10 ],
                        floorspaceRatio: [ 0, 2 ],
                        landOnly: false,
                        nearbyDA: false
                    };

const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case "GET_FILTER": 
            return { ...action.payload };
        case "RESET_FILTER": 
            return initialFilter;
        case "SAVE_FILTER_REQUEST": 
            return state;
        default: 
            return state;
    }
};
export default filterReducer;
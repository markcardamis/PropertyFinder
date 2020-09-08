const initialState = { zone: null,
                        area: [0, 20000],
                        price: [100000, 5000000],
                        priceM2: [1, 10000],
                        postCode: "",
                        priceLandvalue: [0, 10 ],
                        floorspaceRatio: [0, 2]
                    };

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FILTER": 
            return {...action.payload};
        case "SAVE_FILTER_REQUEST": 
            return state;
        default: 
            return state;
    }
};
export default filterReducer;
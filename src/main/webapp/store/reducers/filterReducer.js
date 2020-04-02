const initialState = { zone: null,
                        area: [0, 20000],
                        price: [100000, 5000000],
                        priceM2: [1, 10000],
                        postCode: '',
                        priceLandvalue: [0, 10 ],
                        floorspaceRatio: [0, 2]
                    };

const showPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER': 
            return {...action.payload};
        default: 
            return state;
    }
};
export default showPopupReducer;
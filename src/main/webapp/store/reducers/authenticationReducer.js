// // checkAuthentication = async () => {
//     // const authenticated = async () => await this.props.auth.isAuthenticated();
// // }


// // const initialState = {
// //     authenticated: authenticated,
// //     data: {},
// //     sessionToken: null,
// //     id: null,
// // };

// const authenticationReducer = (state=null, action) => {
//     switch (action.type) {
//         case 'AUTHENTICATED':
//             return {...state, 
//                     authenticated: true, 
//                     data: action.payload, 
//                     // sessionToken: action.payload.sessionToken,
//                     // id: action.payload.user.id
//             };
//         case 'NOT_AUTHENTICATED':
//             return {authenticated: false};
//         default:
//             return state;
//     }
// };

// export default authenticationReducer;
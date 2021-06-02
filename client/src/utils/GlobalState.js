import React, { createContext, useReducer, useContext } from "react";
import {
    GET_LOCATIONS,
    SET_CURRENT_LOCATION,
    CREATE_LOCATION,
    CURRENT_USER,
    LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    switch (action.type) {

        case SET_CURRENT_LOCATION:
            return {
              ...state,
              currentLocation: action.location,
              loading: false
            };

        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
                loading: false
            };

        case GET_LOCATIONS:
            return {
                ...state,
                locations: [...action.locations],
                loading: false
            };

        case CREATE_LOCATION:
            return {
                ...state,
                locations: [action.location, ...state.locations],
                loading: false
            };

        case LOADING:
            return {
                ...state,
                loading: true
            };


        default:
            return state;
    }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        locations: [],
        currentLocation: {
            _id: 0,
            name: "",
            difficulty: "",
            distance: "",
            descent: "",
            climb: "",
            area: "",
            latitude: "",
            longitude: "",
            city: "",
            region: ""
        },
        currentUser: {
            _id: 0,
            username: "",
            location: "",
            points: 0
        },
        loading: false
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
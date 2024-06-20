import handleCar from "./handleCar";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    handleCar,
})
console.log("rootReducer");
export default rootReducers;
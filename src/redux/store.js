import {legacy_createStore as createStore} from "redux";
import rootReducers from "../redux copy/reducer";

const store=createStore(rootReducers);
console.log("store from store"+ store);
export default store;
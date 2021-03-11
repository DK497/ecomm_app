import { createStore,combineReducers,applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension/developmentOnly";

// Reducers
import cartItems from "./reducers/cartItems";

const reducers=combineReducers({
 cartItems:cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;
import { UPDATE_COMPONENT} from '../actions/updateComponent';
export default function componentReducer(state = "/", action) {

    switch(action.type) {
        case UPDATE_COMPONENT:
        return action.component;
        default: 
        return state;
    }
}
import { UPDATE_LOGININPUT} from '../actions/updateLoginInput';
export default function logininputReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_LOGININPUT:
        return action.logininput;
        default: 
        return state;
    }
}
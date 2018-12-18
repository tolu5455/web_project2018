import { UPDATE_REGISTERCONFINPUT} from '../actions/updateRegisterConfInput';
export default function registerconfinputReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_REGISTERCONFINPUT:
        return action.registerconfinput;
        default: 
        return state;
    }
}
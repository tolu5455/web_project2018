import { UPDATE_REGISTER} from '../actions/updateRegister';
export default function registerReducer(state = false, action) {

    switch(action.type) {
        case UPDATE_REGISTER:
        return action.register;
        default: 
        return state;
    }
}
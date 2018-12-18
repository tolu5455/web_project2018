import { UPDATE_REGISTERPBINPUT} from '../actions/updateRegisterPBInput';
export default function registerpbinputReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_REGISTERPBINPUT:
        return action.registerpbinput;
        default: 
        return state;
    }
}
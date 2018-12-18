import { UPDATE_SCKEY} from '../actions/updateSCKey';
export default function sckeyReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_SCKEY:
        return action.sckey;
        default: 
        return state;
    }
}
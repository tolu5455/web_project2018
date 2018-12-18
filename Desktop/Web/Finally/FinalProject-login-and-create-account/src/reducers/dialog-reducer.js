import { UPDATE_DIALOG} from '../actions/updateDialog';
export default function dialogReducer(state = false, action) {

    switch(action.type) {
        case UPDATE_DIALOG:
        return action.dialog;
        default: 
        return state;
    }
}
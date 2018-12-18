import { UPDATE_TAB} from '../actions/updateTab';
export default function tabReducer(state = "post", action) {

    switch(action.type) {
        case UPDATE_TAB:
        return action.tab;
        default: 
        return state;
    }
}
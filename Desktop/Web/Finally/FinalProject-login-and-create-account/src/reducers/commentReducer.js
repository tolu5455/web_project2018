import { UPDATE_COMMENT} from '../actions/updateComment';
export default function commentReducer(state = false, action) {

    switch(action.type) {
        case UPDATE_COMMENT:
        return action.comment;
        default: 
        return state;
    }
}
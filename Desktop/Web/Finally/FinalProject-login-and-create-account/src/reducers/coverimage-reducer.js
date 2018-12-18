import { UPDATE_COVERIMAGE} from '../actions/updateCoverImage';
export default function coverImageReducer(state = { cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg",
                                               profile: "https://4.bp.blogspot.com/-MrZt66Yr1TE/W2GLo95RU5I/AAAAAAABppo/d0-_hQ5ePcQrLje3PmIwhQmf_MeZDSkOACLcBGAs/s1600/champions-league-ball-2018-2019%2B%25282%2529.jpg"}
                                               , action) {

    switch(action.type) {
        case UPDATE_COVERIMAGE:
        return action.image;
        default: 
        return state;
    }
}
export const UPDATE_COVERIMAGE = 'updatecoverimage';

export function updateCoverImage(newImage) {
    return {
        type: UPDATE_COVERIMAGE,
        image: newImage
    };
}
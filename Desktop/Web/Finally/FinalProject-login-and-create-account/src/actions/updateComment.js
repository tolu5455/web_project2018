export const UPDATE_COMMENT = 'updateComment';

export function updateComment(newComment) {
    return {
        type: UPDATE_COMMENT,
        comment: newComment
    };
}
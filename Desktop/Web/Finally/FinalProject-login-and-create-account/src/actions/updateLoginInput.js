export const UPDATE_LOGININPUT = 'updateLoginInput';

export function updateLoginInput(newLoginInput) {
    return {
        type: UPDATE_LOGININPUT,
        logininput: newLoginInput
    };
}
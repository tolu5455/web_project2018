export const UPDATE_REGISTERCONFINPUT = 'updateRegisterConfInput';

export function updateRegisterConfInput(newRegisterConfInput) {
    return {
        type: UPDATE_REGISTERCONFINPUT,
        registerconfinput: newRegisterConfInput
    };
}
export const UPDATE_REGISTERPBINPUT = 'updateRegisterPBInput';

export function updateRegisterPBInput(newRegisterPBInput) {
    return {
        type: UPDATE_REGISTERPBINPUT,
        registerpbinput: newRegisterPBInput
    };
}
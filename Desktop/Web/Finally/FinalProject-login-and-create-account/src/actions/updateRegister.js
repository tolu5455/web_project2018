export const UPDATE_REGISTER = 'updateRegister';

export function updateRegister(newRegister) {
    return {
        type: UPDATE_REGISTER,
        register: newRegister
    };
}
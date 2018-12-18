export const UPDATE_SCKEY = 'updateSCKey';

export function updateSCKey(newSCKey) {
    return {
        type: UPDATE_SCKEY,
        sckey: newSCKey
    };
}
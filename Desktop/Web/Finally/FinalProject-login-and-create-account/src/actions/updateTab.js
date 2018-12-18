export const UPDATE_TAB = 'updateTAB';

export function updateTab(newTab) {
    return {
        type: UPDATE_TAB,
        tab: newTab
    };
}
export const UPDATE_DIALOG = 'updateDialog';

export function updateDialog(newDialog) {
    return {
        type: UPDATE_DIALOG,
        dialog: newDialog
    };
}
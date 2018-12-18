export const UPDATE_COMPONENT = 'updateComponent';

export function updateComponent(newComponent) {
    return {
        type: UPDATE_COMPONENT,
        component: newComponent
    };
}
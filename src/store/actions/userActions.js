import AuthService from "../../services/AuthService";

export const authAction = (payload) => ({
    type: 'LOGIN',
    payload
});

export const setLoadedAction = (payload) => ({
    type: 'SET_LOADED',
    payload
})

export const initAuthAction = () => (dispatch) => {
    AuthService.check()
        .then(resp => dispatch(authAction(resp)))
        .catch(e => console.log(e.message))
        .finally(() => dispatch(setLoadedAction(false)))
}
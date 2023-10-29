import * as api from '../apis';

export const fetchData = () => async (dispatch) => {
    try {
        const { data } = await api.fetchData();
        dispatch({ type: 'SET_DATA', data });
    } catch (err) {
        console.log(err);
    }
};

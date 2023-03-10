import React from "react";

function reducer(state, action) {
  return action.data;
}

export default function useReducerWithMiddleware(async_reducer, initialState) {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const dispatchWithMiddleware = async (action) => {
    const data = await async_reducer(state, action);
    dispatch({ type: 'INIT', data: data });
  };

  return [state, dispatchWithMiddleware];
};

import React, { useReducer } from "react";

type Data = {
  count: number;
};

type ActionType<T> = {
  type: string;
  payload?: Data;
};

function reducer(state: Data, action: ActionType<Data>) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Demo() {
  const intialState = {
    count: 0,
  };
  const [{ count }, dispatch] = useReducer(reducer, intialState);
    return (
        <>
            {count}
            <button onClick={() => dispatch({type: "inc"})}>+</button>
            <button onClick={() => dispatch({type: "dec"})}>-</button>
        </>
    );
}

export default Demo;

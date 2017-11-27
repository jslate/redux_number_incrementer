import React from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// An action name constant, so that we're not risking typos by retyping the same
// string all over the place
const INCREMENT_NUMBER = 'INCREMENT_NUMBER';

// The reducer for our Redux state.  A reducer takes the current state and the
// action that just happened, and returns a new state based on that action.
// (Note: it doesn't modify the existing state in-place, it returns a new copy
// of the state with modifications.)
const reducer = (state, action) => {
  if (action.type === INCREMENT_NUMBER) {
    return {
      ...state,
      number: state.number + 1,
    };
  }

  return state;
};

// Building our Redux store!  To do this, we'll pass in the reducer function
// we just defined as well as the initial state.
const store = createStore(
  reducer,
  { number: 3 },
);

// OK finally here's our component!  Note that it's stateless - it takes
// everything it needs as props.
class NumberIncrementer extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    incrementNumber: PropTypes.func.isRequired,
  };

  render = () => (
    <div className="App" style={{ marginTop: '25px' }}>
      {this.props.number}

      <div>
        <button onClick={this.props.incrementNumber}>
          Increment!
        </button>
      </div>
    </div>
  );
}

// An action creator function.  For this kind of action that doesn't
// bring along any additional data, having a function is arguably useless,
// but for more complex actions it's convenient to define functions that
// let you easily construct action objects.
//
// An action is just an object with a "type" key, and then literally
// anything else you want in it.  For one attempt at standardizing action
// shapes, check out Flux Standard Action:
// https://github.com/acdlite/flux-standard-action
const incrementNumber = () => ({ type: INCREMENT_NUMBER });

// A function that takes a global state object, and returns the props to
// pass into our React component.  In this case, we just want the number
// to display.
const mapStateToProps = (state) => ({
  number: state.number,
});

// A function that takes the "dispatch" method of the Redux store, and
// returns props to pass into our React component based on that.
// Typically these will all be function props that the React component
// can call in order to dispatch actions to the store.  In this case,
// we want to be able to dispatch an INCREMENT_NUMBER action when the
// button gets clicked.
const mapDispatchToProps = (dispatch) => ({
  incrementNumber: () => { dispatch(incrementNumber()); },
});

// Oh god, connect.  Connect is a function that takes one or more
// functions as props and returns a function that takes a React component
// and returns a different React component wrapping it.
//
// Let's break this down:
// connect(mapStateToProps, mapDispatchToProps) -> myConnectFunction
const myConnectFunction = connect(mapStateToProps, mapDispatchToProps);

// myConnectFunction(NumberIncrementer) -> another React component that
//   wraps NumberIncrementer, but wires in the props we want by calling
//   mapStateToProps and mapDispatchToProps
const ConnectedNumberIncrementer = myConnectFunction(NumberIncrementer);

// Finally you need a Redux provider, so that Redux-connected components
// can find the store and talk to it.  (If you try to render a Redux-
// connected component outside a Provider, you get an error.)
class AllThisCrapWithAProvider extends React.Component {
  render = () => (
    <Provider store={store}>
      <ConnectedNumberIncrementer />
    </Provider>
  );
}

// And this wraps up everything we need.  You can render this anywhere,
// it'll have a self-contained Redux store and reducer and everything.
export default AllThisCrapWithAProvider;

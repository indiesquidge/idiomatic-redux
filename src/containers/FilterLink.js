import React, { Component } from 'react'

import store from '../store/index'

import Link from '../components/Link'

export default class FilterLink extends Component {
  render () {
    const props = this.props
    const state = store.getState()

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    )
  }
}

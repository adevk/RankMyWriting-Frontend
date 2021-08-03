import { DEFAULT_SCORE } from './index.js'

/**
 * Reducer for the voting page component.
 * 
 * @param {object} state - The reducer's state object.
 * @param {object} action - The reducer's action object.
 */
export const reducer = (state, action) => {
  if (action.type === 'SET_COMPREHENSIBLE_SCORE') {
    return {...state, comprehensibleScore: action.payload}
  }
  if (action.type === 'SET_ENGAGING_SCORE') {
    return {...state, engagingScore: action.payload}
  }
  if (action.type === 'SET_CONVINCING_SCORE') {
    return {...state, convincingScore: action.payload}
  }

  if (action.type === 'RESET_STATES') {
    return {
      comprehensibleScore: DEFAULT_SCORE,
      engagingScore: DEFAULT_SCORE,
      convincingScore: DEFAULT_SCORE,
    }
  }
  return state
}

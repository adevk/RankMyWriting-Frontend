import { DEFAULT_SCORE } from './index.js'

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

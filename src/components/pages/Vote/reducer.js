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

  if (action.type === 'TOGGLE_CONVERSATIONAL') {
    const isConversational = action.payload
    if (!isConversational) {
      return {...state, isConversational: true, isFormal: false}
    }
  }
  if (action.type === 'TOGGLE_FORMAL') {
    const isFormal = action.payload
    if (!isFormal) {
      return {...state, isFormal: true, isConversational: false}
    }
  }
  if (action.type === 'TOGGLE_NEGATIVE') {
    const isNegative = action.payload
    if (!isNegative) {
      return {...state, isNegative: true, isPositive: false}
    }
  }
  if (action.type === 'TOGGLE_POSITIVE') {
    const isPositive = action.payload
    if (!isPositive) {
      return {...state, isPositive: true, isNegative: false}
    }
  }
  if (action.type === 'TOGGLE_IMPERSONAL') {
    const isImpersonal = action.payload
    if (!isImpersonal) {
      return {...state, isImpersonal: true, isPersonal: false}
    }
  }
  if (action.type === 'TOGGLE_PERSONAL') {
    const isPersonal= action.payload
    if (!isPersonal) {
      return {...state, isPersonal: true, isImpersonal: false}
    }
  }
  if (action.type === 'RESET_STATES') {
    return {
      comprehensibleScore: 3,
      engagingScore: 3,
      convincingScore: 3,
      isConversational: null,
      isFormal: null,
      isNegative: null,
      isPositive: null,
      isImpersonal: null,
      isPersonal: null
    }
  }
  return state
}

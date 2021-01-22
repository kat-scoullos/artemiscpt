import axios from 'axios'

const GET_EXERCISES = 'GET_EXERCISES'

export const getExercises = exercises => ({
  type: GET_EXERCISES,
  exercises
})

export const fetchExercises = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/exerciselibrary')
    dispatch(getExercises(data))
  } catch (error) {
    console.log(`Error fetching exercises from API.`)
  }
}

const ADD_EXERCISE = 'ADD_EXERCISE'

export const addExercise = exercise => ({
  type: ADD_EXERCISE,
  exercise
})

export const createWorkout = (userId, exerciseId) => async dispatch => {
  try {
    const {data} = await axios.post('./api/exerciselibrary/:exerciseId', {
      userId,
      exerciseId
    })
    dispatch(addExercise(data))
  } catch (error) {
    console.log('Error adding exercise.')
  }
}
const initialState = []

export default function exercisesReducer(state = initialState, action) {
  // console.log('action is:', action)
  // console.log('what is action.exercise', action.exercise)
  switch (action.type) {
    case GET_EXERCISES:
      return action.exercises
    case ADD_EXERCISE:
      return {...state, exercises: action.exercise}
    default:
      return state
  }
}

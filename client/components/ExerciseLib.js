import React from 'react'
import {connect} from 'react-redux'
import {fetchExercises} from '../store/exercises'
import {addToWorkout} from '../store/workoutHistory'
import {Button, Container} from 'react-bootstrap'
import ReactPlayer from 'react-player'

class ExerciseLab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: 'All Exercises'
    }
  }
  async componentDidMount() {
    await this.props.loadExercises()
  }

  filterMuscleGroup = () => {
    let selectedGroup = document.getElementById('muscleGroup').value
    this.setState(() => ({
      selectedGroup: selectedGroup
    }))
  }

  render() {
    let displayedExercises = this.props.exercises.filter(exercise => {
      if (
        this.state.selectedGroup === 'All Exercises' ||
        exercise.type === this.state.selectedGroup
      ) {
        return true
      }
      return false
    })

    return (
      <div>
        <h1 className="library-header">Personal Exercise Library</h1>
        <h4 className="library-info">
          Select your exercises and go to your daily workout!
        </h4>
        <h5 className="library-info">Filter by Muscle Groups</h5>
        <div className="drop-down-container">
          <div>
            <select
              className="select-type"
              id="muscleGroup"
              onChange={this.filterMuscleGroup}
            >
              <option>All Exercises</option>
              <option>Upper Body</option>
              <option>Lower Body</option>
              <option>Full Body</option>
              <option>Core</option>
            </select>
          </div>
        </div>
        <Container>
          {displayedExercises.map(exercise => (
            <div className="all-exercises-container" key={exercise.id}>
              <ul className="all-exercises">
                <li className="exercise-title">{exercise.name}</li>
                <li>Muscle Group: {exercise.type}</li>
                <li>Set(s): {exercise.sets}</li>
                <li>Reps: {exercise.repetitions}</li>
                <br />
                <ReactPlayer
                  url={exercise.video}
                  width="400"
                  height="300"
                  className="embedded-video"
                />
                <br />
                <Button
                  className="button-exercise"
                  type="submit"
                  onClick={() => {
                    this.props.addExercise(this.props.userId, exercise.id)
                  }}
                >
                  Add to Daily Workout
                </Button>
              </ul>
            </div>
          ))}
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    exercises: state.exercises
  }
}

const mapDispatch = dispatch => {
  return {
    loadExercises: () => dispatch(fetchExercises()),
    addExercise: (userId, exerciseId) =>
      dispatch(addToWorkout(userId, exerciseId))
  }
}

export default connect(mapState, mapDispatch)(ExerciseLab)

import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer.js'

const Filter = () => {
  const dispatch = useDispatch()

  const applyFilter = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={applyFilter} />
    </div>
  )
}

export default Filter

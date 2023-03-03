import { type FC, useState } from 'react'
import '../styles/card.css'
import type { Time } from '../types/time'

type CardProps = {
  index: number
  updateTimes: (index: number, time: Omit<Time, 'index'>) => void
}

type CardState = {
  hours: number | string
  minutes: number | string
  seconds: number | string
}

const Card: FC<CardProps> = props => {
  const { index, updateTimes } = props
  const [state, setState] = useState<CardState>({
    hours: '',
    minutes: '',
    seconds: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(event.target.max)
    const { name, valueAsNumber } = event.target

    if (isNaN(valueAsNumber)) {
      setState({
        ...state,
        [name]: ''
      })

      return
    }

    if (valueAsNumber > max) return

    const newState = {
      ...state,
      [name]: valueAsNumber
    }

    setState(newState)
    updateTimes(index, {
      hours: typeof newState.hours === 'string' ? 0 : newState.hours,
      minutes: typeof newState.minutes === 'string' ? 0 : newState.minutes,
      seconds: typeof newState.seconds === 'string' ? 0 : newState.seconds
    })
  }

  return (
    <li className='link-card'>
      <div>
        <label>Hours</label>
        <input
          name='hours'
          type='number'
          max={24}
          min={0}
          value={state.hours}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Minutes</label>
        <input
          name='minutes'
          type='number'
          max={59}
          min={0}
          value={state.minutes}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Seconds</label>
        <input
          name='seconds'
          type='number'
          max={59}
          min={0}
          value={state.seconds}
          onChange={handleInputChange}
        />
      </div>
    </li>
  )
}

export { Card }

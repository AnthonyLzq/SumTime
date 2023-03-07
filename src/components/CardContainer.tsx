import { useState } from 'react'

import { Card } from './Card'
import '../styles/cardContainer.css'
import type { Time } from '../types/time'

const defaultTime: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  index: 0
}
const initialState = [
  {
    ...defaultTime,
    index: 0
  },
  {
    ...defaultTime,
    index: 1
  }
]

const CardContainer = () => {
  const [numberOfCards, setNumberOfCards] = useState(2)
  const [times, setTimes] = useState(initialState)
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null)
  const days =
    typeof totalSeconds === 'number'
      ? Math.floor(totalSeconds / (24 * 3600))
      : null
  const hours =
    typeof totalSeconds === 'number'
      ? Math.floor((totalSeconds % (24 * 3600)) / 3600)
      : null
  const minutes =
    typeof totalSeconds === 'number'
      ? Math.floor((totalSeconds % 3600) / 60)
      : null
  const seconds =
    typeof totalSeconds === 'number' ? Math.floor(totalSeconds % 60) : null

  const updateTimes = (index: number, time: Omit<Time, 'index'>) => {
    setTimes(prev => {
      const newTimes = prev.concat([])
      newTimes[index] = {
        ...time,
        index
      }

      return newTimes
    })
  }

  const handleTotalSeconds = () => {
    const totalSeconds = times.reduce((acc, time) => {
      const { hours, minutes, seconds } = time
      const totalSeconds = hours * 3600 + minutes * 60 + seconds

      return acc + totalSeconds
    }, 0)

    setTotalSeconds(totalSeconds)
  }

  return (
    <>
      <ul role='list' className='link-card-grid'>
        <Card index={0} updateTimes={updateTimes} />
        <Card index={1} updateTimes={updateTimes} />
        {Array.from({ length: numberOfCards - 2 }, (_, i) => (
          <Card key={i} index={i + 2} updateTimes={updateTimes} />
        ))}
      </ul>
      <div className='buttons'>
        <button
          onClick={() => {
            setNumberOfCards(prev => prev + 1)
            setTimes(prev =>
              prev.concat([
                {
                  ...defaultTime,
                  index: prev.length
                }
              ])
            )
          }}
        >
          +
        </button>
        {numberOfCards > 2 ? (
          <button
            onClick={() => {
              setNumberOfCards(prev => prev - 1)
              setTimes(prev => prev.slice(0, -1))
            }}
          >
            -
          </button>
        ) : null}
        <button onClick={handleTotalSeconds}> = </button>
      </div>
      {totalSeconds ? (
        <div className='result'>
          Result:{' '}
          <code>
            {days && days > 0 ? `${days}d, ` : ''}
            {hours?.toString().padStart(2, '0')}:
            {minutes?.toString().padStart(2, '0')}:
            {seconds?.toString().padStart(2, '0')}
          </code>
          .
        </div>
      ) : null}
    </>
  )
}

export { CardContainer }

import React, { useEffect, useState } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useBus } from '../../contexts/bus'

export default function Loading () {
  const bus = useBus()
  const [progress, setProgress] = useState(0)
  let timer: number

  const start = () => {
    timer = window.setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 50)
  }

  const stop = () => {
    setProgress(100)
    clearInterval(timer)
  }

  useEffect(() => {
    bus?.on('loading.start', start)
    bus?.on('loading.stop', stop)
    return () => {
      stop()
      bus?.off('loading.start', start)
      bus?.off('loading.start', stop)
    }
  })

  return (
    <Box className="loading" sx={{ width: '100%', marginTop: '-4px' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
import { render } from 'preact'
import { App } from './app'
import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

render(<ChakraProvider><App /></ChakraProvider>, document.getElementById('app'))

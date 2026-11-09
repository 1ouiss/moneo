import { renderToString } from 'react-dom/server'
import { Landing } from '@/components/Landing'

export const render = () => renderToString(<Landing />)

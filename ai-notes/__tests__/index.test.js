import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Notespage from '../src/app/notes/page.tsx'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Notespage />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})
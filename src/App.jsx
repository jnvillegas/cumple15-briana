import { Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Quote from './components/Quote'
import VerticalGallery from './components/VerticalGallery'
import Details from './components/Details'
import DressCode from './components/DressCode'
import Gallery from './components/Gallery'
import GiftTable from './components/GiftTable'
import Trivia from './components/Trivia'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import Admin from './components/Admin'
import Landing from './components/Landing'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Countdown />
            <Quote />
            <VerticalGallery />
            <Details />
            <DressCode />
            <Gallery />
            <GiftTable />
            <Trivia />
            <RSVP />
            <Footer />
          </main>
        } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </div>
  )
}

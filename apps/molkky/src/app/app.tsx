// eslint-disable-next-line @typescript-eslint/no-unused-vars

import HomePage from './pages/home-page/home-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './pages/game/game';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css'
import { Routes, Route } from "react-router-dom";
import SeedPhraseSelection from './components/custom/SeedPhraseSelection';
import Layout from './components/custom/Layout.tsx'
import ImportSeedPhrase from './components/custom/ImportSeedPhrase.tsx';
import GenerateSeedPhrase from './components/custom/GenerateSeedPhrase.tsx';
import Wallets from './components/custom/Wallets.tsx';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SeedPhraseSelection />} />
        <Route path="seed/add" element={<ImportSeedPhrase />} />
        <Route path="seed/generate" element={<GenerateSeedPhrase />} />
        <Route path="wallet/view" element={<Wallets />} />
      </Route>
    </Routes>

  )
}

export default App

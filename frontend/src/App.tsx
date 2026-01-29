import './App.css'
import { Routes, Route } from "react-router-dom";
import SeedPhraseSelection from './components/custom/SeedPhraseSelection';
import Layout from './components/custom/Layout.tsx'
import ImportSeedPhrase from './components/custom/ImportSeedPhrase.tsx';
import GenerateSeedPhrase from './components/custom/GenerateSeedPhrase.tsx';
import Wallets from './components/custom/Wallets.tsx';
import LoginForm from './components/custom/LoginForm.tsx';
import RegisterForm from './components/custom/RegisterForm.tsx';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SeedPhraseSelection />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path="seed/add" element={<ImportSeedPhrase />} />
        <Route path="seed/generate" element={<GenerateSeedPhrase />} />
        <Route path="wallet/view" element={<Wallets />} />
      </Route>
    </Routes>

  )
}

export default App

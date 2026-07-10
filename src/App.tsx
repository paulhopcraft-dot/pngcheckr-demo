import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Landing } from "@/pages/Landing";
import { Employer } from "@/pages/Employer";
import { Candidate } from "@/pages/Candidate";
import { VerifyCode } from "@/pages/VerifyCode";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/employer" element={<Employer />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/verify/:code" element={<VerifyCode />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

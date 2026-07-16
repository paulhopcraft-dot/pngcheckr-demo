import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home } from "@/pages/Home";
import { JobSearch } from "@/pages/JobSearch";
import { JobDetail } from "@/pages/JobDetail";
import { Employers } from "@/pages/Employers";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/employers" element={<Employers />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

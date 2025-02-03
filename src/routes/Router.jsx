import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";


import NotFound from "../components/404/404";
import HeroCards from "../components/HeroCards/HeroCards";
import HeroDetails from "../components/HeroDetails/HeroDetails";
import Intro from "../components/Intro/Intro";

export default function Router() {
  const { user } = useAuth(); 
  return (
    <Routes>
      
      <Route path="*" element={<NotFound />} />
      <Route path="/heros" element={<HeroCards/>} />
      <Route path="/hero/:id" element={<HeroDetails />} />
      <Route path="/" element={<Intro />} />
      
    </Routes>
  );
}

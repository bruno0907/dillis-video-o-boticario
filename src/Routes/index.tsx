import {    
  BrowserRouter,
  Routes as PageRoutes,
  Route,  
} from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Player } from "../pages/Player";
import { SignIn } from "../pages/SignIn";
import { Customers } from "../pages/Customers";

export const Routes = () => {
  return (
    <BrowserRouter>
      <PageRoutes>
        <Route path="/" element={<Home />} />              
        <Route path="/sign-in" element={<SignIn />} />          
        <Route path="/customers" element={<Customers />} />
        <Route path="/player" element={<Player />} />
        <Route path="/*" element={<NotFound />} />
      </PageRoutes>
    </BrowserRouter>
  )
}
//import LandingPage from "@/components/LandingPage"
//import { currentUser } from "@clerk/nextjs/server"
//import { redirect} from "next/navigation"
import {useUser} from "@clerk/nextjs";

export default function HomePage() {
  const {isSignedIn, user } = useUser();

  if (!isSignedIn) return <LandingPage />;
    // If user logged in, redirect them to the events page
    return redirect('/events');  

}

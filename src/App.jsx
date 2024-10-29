import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home"
import PlayersRegisterPage from "./pages/PlayersRegister"
import StandingTablePage from "./pages/StandingTable"
import RoundsResultPage from "./pages/RoundResult"
import StartingStandingPage from "./pages/StartingStanding"
import TournaumentLayout from "./layouts/TournaumentLayout"
import EndMatchPage from "./pages/EndMatch"
import RoundStandingPage from "./pages/RoundStanding"
import RoundResultDetailPage from "./pages/RoundResultDetail"
import ProfilePage from "./pages/Profile"
import ErrorPage from "./pages/Error"

const router = createBrowserRouter([
  {
    path: '/',
    element: <TournaumentLayout />,
    children: [
      {index: true, element: <HomePage />},
      {
        path: 'register-players',
        children: [
          {index: true, element: <PlayersRegisterPage />},
        ]
      },
      {
        path: 'tournaument',
        children: [
          {
            path: 'standing-table',
            children: [
              {index: true, element: <StandingTablePage />},
              {
                path: ':roundNumber',
                element: <RoundStandingPage />
              }
            ]
          },
          {
            path: 'round-result',
            children: [
              {index: true, element: <RoundsResultPage />},
              {
                path: ':roundNumber',
                element: <RoundResultDetailPage />
              }
            ]
          },
          {
            path: 'starting-table',
            children: [
              {index: true, element: <StartingStandingPage />},
            ]
          },
          {
            path: 'end-match',
            children: [
              {index: true, element: <EndMatchPage />},
            ]
          },
          {
            path: 'profile',
            children: [
              {index: true, element: <ErrorPage/>},
              {
                path: ':playerId',
                element: <ProfilePage />
              }
            ]
          },
        ]
      },
      
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

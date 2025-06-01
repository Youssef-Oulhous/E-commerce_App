import { Route , Routes } from "react-router-dom"
import EcommerceDashboard from "../../E-commerce-Dashboard/EcommerceDashboard"
import MainDashboard from "../../E-commerce-Dashboard/MainDashboard"



export default function Dashboard () {

    return(
        <>
        <Routes>
        <Route path="/" element={<MainDashboard />} />

        </Routes>
        </>
    )
}
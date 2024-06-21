import { Route, Routes } from "react-router"
import Home from "../pages/home"
import ZaminEco from "../pages/zamineco"
import Login from "../pages/login"
import Dashboard from "../pages/dashboard"
import Sidebar from "../components/sidebar/sidebar"
import Videos from "../pages/videos"
import Tests from "../pages/tests"
import TestInner from "../pages/tests-inner"
import CreativeDashboard from "../pages/creative-dashboard"
import NewsDashboard from "../pages/news-dashboard"
import NewsEcoDashboard from "../pages/eco-news-dashboard"

const DashboardLayout = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/creative" element={<CreativeDashboard />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/news" element={<NewsDashboard />} />
                <Route path="/eco/new" element={<NewsEcoDashboard />} />
                <Route path="/tests/:id" element={<TestInner />} />
            </Routes>
        </>
    )
}
export default DashboardLayout
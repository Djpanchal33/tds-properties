import { getSiteData } from "@/lib/data";
import AdminDashboard from "@/components/admin-dashboard";
export default async function AdminPage() { const {properties,settings}=await getSiteData(); return <AdminDashboard initialProperties={properties} initialSettings={settings}/>; }

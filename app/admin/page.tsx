import { getBlogPosts, getServices, getSiteData } from "@/lib/data";
import AdminDashboard from "@/components/admin-dashboard";
export default async function AdminPage() { const [{properties,settings}, services, blogPosts] = await Promise.all([getSiteData(), getServices(), getBlogPosts()]); return <AdminDashboard initialProperties={properties} initialSettings={settings} initialServices={services} initialBlogPosts={blogPosts}/>; }

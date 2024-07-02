
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {useState } from "react";

const Dashboard: React.FC = () => {
	const [data, setData] = useState<any>();

	return (
		<DashboardLayout>
			<DashboardNavbar />

			{data ?
				<MDBox py={3}>
				</MDBox>
				: (
					<div>Loading...</div>
				)}
			<Footer />
		</DashboardLayout>
	);
}

export default Dashboard;

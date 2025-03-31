import ContextProvider from "@/context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/vendors/halpes-icons/style.css";
import "@/vendors/reey-font/stylesheet.css";
import "@/vendors/fontawesome/css/all.min.css";
import "@/vendors/animate/animate.min.css";
import "node_modules/swiper/swiper-bundle.min.css";
import "tiny-slider/dist/tiny-slider.css";

// extra css
import "@/styles/globals.css";
import "@/styles/halpes.css";
import "@/styles/halpes-responsive.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "../i18n";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
	() => {
		return import("@/components/TopProgressBar");
	},
	{ ssr: false }
);

// optional configuration
const options = {
	// you can also just use 'bottom center'
	position: positions.TOP_CENTER,
	timeout: 5000,
	offset: "30px",
	// you can also just use 'scale'
	transition: transitions.SCALE,
};

const MyApp = ({ Component, pageProps }) => {
	return (
		<GoogleOAuthProvider clientId="669829110000-3p54r4of336a74q3r895ged05bgdtlm4.apps.googleusercontent.com">
			<ContextProvider>
				<AlertProvider template={AlertTemplate} {...options}>
					<TopProgressBar />
					<Component {...pageProps} />
				</AlertProvider>
			</ContextProvider>
		</GoogleOAuthProvider>
	);
};

export default MyApp;

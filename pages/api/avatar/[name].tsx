import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { generateGradient } from "../../../utils/gradient";

export const runtime = "edge";

export default async function handler(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const name = searchParams.get("name");
	const text = searchParams.get("text");
	const size = Number(searchParams.get("size") || "120");
	const rounded = Number(searchParams.get("rounded") || "0");

	const [username] = name?.split(".") || [];

	const gradient = await generateGradient(username || `${Math.random()}`);

	return new ImageResponse(
		<div
			style={{
				width: size,
				height: size,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: `linear-gradient(to bottom right, ${gradient.fromColor}, ${gradient.toColor})`,
				borderRadius: rounded,
				color: "white",
				fontSize: text ? size / text.length : size,
				fontWeight: "bold",
				fontFamily: "sans-serif",
				position: "relative",
			}}
		>
			{/* Bold text effect using 3 overlapping text elements */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-46%, -46%)",
					color: "rgba(0, 0, 0, 0.3)",
					fontSize: text ? size / text.length : size,
					fontWeight: "bold",
					fontFamily: "sans-serif",
					zIndex: 1,
				}}
			>
				{text || ""}
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-51%, -51%)",
					color: "rgba(0, 0, 0, 0.3)",
					fontSize: text ? size / text.length : size,
					fontWeight: "bold",
					fontFamily: "sans-serif",
					zIndex: 2,
				}}
			>
				{text || ""}
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					color: "white",
					fontSize: text ? size / text.length : size,
					fontWeight: "bold",
					fontFamily: "sans-serif",
					zIndex: 3,
				}}
			>
				{text || ""}
			</div>
			<img
				src="https://klout.gg/android-chrome-512x512.svg"
				alt="logo"
				width={30}
				height={30}
				style={{
					position: "absolute",
					top: 5,
					right: 0,
				}}
			/>
		</div>,
		{
			width: size,
			height: size,
		},
	);
}

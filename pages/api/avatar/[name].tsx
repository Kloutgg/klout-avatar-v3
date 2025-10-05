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
			{text || ""}
			<img
				src="https://klout.gg/android-chrome-512x512.svg"
				alt="logo"
				width={50}
				height={50}
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

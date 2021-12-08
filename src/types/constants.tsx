/* eslint-disable no-unused-vars */
import { IDiscColor } from "./abstract";

export const NUM_DISCS_TO_RENDER_INCR = 50;

export const DiscColorMap: Map<string, IDiscColor> = new Map([
	["Aerobie", { color: "#000000", backgroundColor: "#F4BBD4" }],
	["AquaFlight", { color: "#050505", backgroundColor: "#1EFF9A" }],
	["Axiom Discs", { color: "#1E00FF", backgroundColor: "#08F8BE" }],
	["Daredevil Discs", { color: "#FFFFFF", backgroundColor: "#515151" }],
	["DGA", { color: "#F6FF4D", backgroundColor: "#147215" }],
	["Disc Golf UK", { color: "#070707", backgroundColor: "#5FFF77" }],
	["Discmania", { color: "#480E03", backgroundColor: "#F4BE41" }],
	["Discraft", { color: "#FFFFFF", backgroundColor: "#2072FF" }],
	["Dynamic Discs", { color: "#000000", backgroundColor: "#F1F40E" }],
	["EV-7", { color: "#FFFFFF", backgroundColor: "#1D20FF" }],
	["Gateway", { color: "#FFFFFF", backgroundColor: "#A66A17" }],
	["Infinite Discs", { color: "#FFFFFF", backgroundColor: "#741DFF" }],
	["Innova", { color: "#FFFC57", backgroundColor: "#000000" }],
	["Kastaplast", { color: "#000000", backgroundColor: "#F16680" }],
	["Latitude 64", { color: "#3A28FF", backgroundColor: "#46F45F" }],
	["Ledgestone", { color: "#FF5218", backgroundColor: "#0C3A08" }],
	["Legacy", { color: "#3831F0", backgroundColor: "#E43DD9" }],
	["Lightning", { color: "#FF23D7", backgroundColor: "#BEBDA2" }],
	["Lone Star Discs", { color: "#FFFFFF", backgroundColor: "#97CB89" }],
	["Millennium", { color: "#8C3CF4", backgroundColor: "#20DFEE" }],
	["Mint Discs", { color: "#000000", backgroundColor: "#F4F4F4" }],
	["MVP", { color: "#FF1E47", backgroundColor: "#6C0606" }],
	["Other", { color: "#8F633C", backgroundColor: "#C7FF56" }],
	["Prodigy", { color: "#22FF16", backgroundColor: "#5D3E8A" }],
	["Prodiscus", { color: "#32E65C", backgroundColor: "#3E00A9" }],
	["RPM", { color: "#F3FC54", backgroundColor: "#8E235E" }],
	["Streamline", { color: "#16FF26", backgroundColor: "#989898" }],
	["Thought Space Athletics", { color: "#FFFFFF", backgroundColor: "#2C75FF" }],
	["Vibram", { color: "#000000", backgroundColor: "#A188F4" }],
	["Viking", { color: "#000000", backgroundColor: "#F400AE" }],
	["Westside Discs", { color: "#BEFAFF", backgroundColor: "#F42300" }],
	["Wild Discs", { color: "#FF2814", backgroundColor: "#3EFF1D" }],
	["Yikun", { color: "#006A6E", backgroundColor: "#FF7900" }]
]);

export enum CSSClasses {
	spinInDetail = "spin-in-detail",
	spinOutDetail = "spin-out-detail"
}

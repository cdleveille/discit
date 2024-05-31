"use client";

import { useContext } from "react";

import { DiscContext, DiscDetail } from "@components";

export default function DiscDetailPage({ params: { name_slug } }: { params: { name_slug: string } }) {
	const { discs, setDiscDetail } = useContext(DiscContext);
	const disc = discs.find(disc => disc.name_slug === name_slug);
	if (!disc) return null;
	setDiscDetail(disc);
	return <DiscDetail />;
}

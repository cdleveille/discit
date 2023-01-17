export interface IDisc {
	name: string;
	brand: string;
	category: string;
	speed: string;
	glide: string;
	turn: string;
	fade: string;
	stability: string;
	link: string;
	pic: string;
	name_slug: string;
	brand_slug: string;
	category_slug: string;
	stability_slug: string;
	color: string;
	background_color: string;
}

export interface IUser {
	id: string;
	username: string;
	password: string;
}

export interface IBag {
	id: string;
	name: string;
	user_id: string;
	discs: string[];
}

export interface IDiscColor {
	color: string;
	backgroundColor: string;
}

export interface IResponse<T = any> {
	ok: boolean;
	status: number;
	data: T;
	error?: string;
}

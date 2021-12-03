export default class Config {
	public static readonly Public = {
		IS_PROD: process.env.NEXT_PUBLIC_IS_PROD,
		API_URL: process.env.NEXT_PUBLIC_API_URL
	}
}

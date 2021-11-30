export class ClientConfig {
	public static readonly Public = {
		NEXT_PUBLIC_IS_PROD: process.env.NEXT_PUBLIC_IS_PROD,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
	}
}

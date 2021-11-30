export class Config {
	public static readonly Options = {
		IS_PROD: process.env.NODE_ENV == "production" ? true : false,
		API_URL: process.env.API_URL
	};
}

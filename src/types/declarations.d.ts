declare module "react-use-keypress" {
	export default function useKeypress(
		keys: string | string[],
		handler: (event: KeyboardEvent) => void
	): void;
}

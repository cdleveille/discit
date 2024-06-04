import { Modal, NewBag } from "@components";

export default function NewBagModal() {
	return (
		<Modal borderRadius="1rem" showCloseBtn>
			<NewBag backOnSubmit />
		</Modal>
	);
}

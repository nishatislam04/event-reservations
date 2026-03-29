import { UserValidation } from "../../validation/user/userValidation";
import type {
	FullValidationDataUserCreate,
	UserCreateProps,
	UserStatusType,
	UsertypeType,
} from "./user.type";

export class User {
	id: string | null = null;
	username: string | null = null;
	password: string | null = null;
	email: string | null = null;
	type: UsertypeType = "guest";
	status: UserStatusType = "inactive";
	wallet: number | 0 = 0;

	get() {
		return {
			id: this.id,
			name: this.username,
			email: this.email,
			type: this.type,
			status: this.status,
			wallete: this.wallet,
		};
	}

	create(props: UserCreateProps) {
		const userValidationRersult = UserValidation.validate(props);
		if (!userValidationRersult?.success) return userValidationRersult;

		const data = userValidationRersult.data as FullValidationDataUserCreate;

		this._id = props.id;
		this.username = data.username;
		this.email = data.email;
		this.type = data.type;
		this.wallet = props.wallet;

		return {
			id: this._id,
			username: this.username,
			email: this.email,
			type: this.type,
			status: this.status,
		};
	}

	updateUsername() {}

	updateEmail() {}

	updatePassword() {}

	updateType() {}

	updateStatus() {}
}

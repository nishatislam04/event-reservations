import z from "zod";
import type { UserCreateProps, UsertypeType } from "../../http/user/user.type";

export class UserValidation {
	static validate(props: UserCreateProps) {
		if (!props.username)
			return { success: false, message: "username is missing", data: null };
		if (!props.email)
			return { success: false, message: "email is missing", data: null };
		if (!props.type)
			return { success: false, message: "user type is missing", data: null };

		const usernameValidation = UserValidation.validateUserName(props.username);
		if (!usernameValidation.success) return usernameValidation;

		const emailValidation = UserValidation.validateEmail(props.email);
		if (!emailValidation.success) return emailValidation;

		const typesValidation = UserValidation.validateType(props.type);
		if (!typesValidation.success) return typesValidation;

		return {
			success: true,
			message: "user validation success",
			data: {
				username: usernameValidation.data.username,
				email: emailValidation.data.email,
				type: typesValidation.data.userType,
			},
		};
	}

	static validateUserName(username: string) {
		const pattern = /^[a-zA-Z]+[\d]*$/i;
		const test = pattern.test(username);
		if (!test) {
			return {
				success: false,
				message:
					"username must only contains alphabets and optionally digits at the end. nothing else. please try again. example - nishat304",
				data: { username },
			};
		}
		return {
			success: true,
			message: "username is valid",
			data: { username },
		};
	}

	static validateEmail(email: string) {
		const emailSchema = z.email();
		const emailValidation = emailSchema.safeParse(email);
		if (!emailValidation.success)
			return {
				success: false,
				message: emailValidation.error.issues[0]?.message,
				data: { email },
			};

		return {
			success: true,
			message: null,
			data: { email },
		};
	}

	static validateType(userType: UsertypeType) {
		const userTypesSet = new Set([
			"organizer",
			"attendee",
			"platform",
			"guest",
		]);
		const checkExist = userTypesSet.has(userType);

		if (!checkExist) {
			return {
				success: false,
				message: "wrong user type was choosen",
				data: { userType },
			};
		}
		return {
			success: true,
			message: "user type validation success",
			data: { userType },
		};
	}
}

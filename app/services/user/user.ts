export class UserService {
	static emailExist(email: string) {
		return {
			success: true,
			message: "email unique",
			data: { email },
		};
	}
}

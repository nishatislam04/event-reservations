import { describe, expect, test } from "bun:test";
import { User } from "../../app/http/user/user";
import type { UsertypeType } from "../../app/http/user/user.type";
import { UserValidation } from "../../app/validation/user/userValidation";

describe("user tests", () => {
	describe("create", () => {
		test("successfully create a user with valid data", () => {
			const user = new User();
			const result = user.create({
				id: "first-organizer",
				username: "firstOrganizer",
				email: "firstemail@gmail.com",
				type: "organizer",
				wallete: 19099,
			});

			// check returned object
			expect(result).toEqual({
				id: "first-organizer",
				username: "firstOrganizer",
				email: "firstemail@gmail.com",
				type: "organizer",
				status: "inactive",
			});

			// verify instance were updated
			expect(user._id).toBe("first-organizer");
			expect(user.username).toBe("firstOrganizer");
			expect(user.email).toBe("firstemail@gmail.com");
			expect(user.type).toBe("organizer");
			expect(user.status).toBe("inactive");
			expect(user.wallete).toBe(19099);
		});

		// i feel like we need to have a test here for the error state
	});

	describe("checking user entities", () => {
		test("username is missing", () => {
			const user = new User();
			const result = user.create({
				id: "test",
				email: "test@email.com",
				username: "",
				type: "organizer",
				wallete: 10,
			});
			expect(result).toEqual({
				success: false,
				message: "username is missing",
				data: null,
			});
		});

		test("invalid username was provided", () => {
			const user = new User();
			const username = "result-user";
			const result = user.create({
				id: "test",
				email: "test@email.com",
				username,
				type: "organizer",
				wallete: 10,
			});

			expect(result).toEqual({
				success: false,
				message:
					"username must only contains alphabets and optionally digits at the end. nothing else. please try again. example - nishat304",
				data: { username },
			});
		});

		test("email is missing", () => {
			const user = new User();
			const result = user.create({
				id: "test",
				email: "",
				username: "username",
				type: "organizer",
				wallete: 10,
			});

			expect(result).toEqual({
				success: false,
				message: "email is missing",
				data: null,
			});
		});

		test("invalid email was provided", () => {
			const user = new User();
			const email = "test.com";
			const result = user.create({
				id: "test",
				email,
				username: "username",
				type: "organizer",
				wallete: 10,
			});

			expect(result).toEqual({
				success: false,
				message: "Invalid email address",
				data: { email },
			});
		});

		test("user type is missing", () => {
			const user = new User();
			const result = user.create({
				id: "test",
				email: "test@email.com",
				username: "validusername",
				type: "" as UsertypeType,
				wallete: 10,
			});

			expect(result).toEqual({
				success: false,
				message: "user type is missing",
				data: null,
			});
		});

		test("wrong user type was provided", () => {
			const user = new User();
			const userType = "hello" as UsertypeType;
			const result = user.create({
				id: "test",
				email: "test@email.com",
				username: "username",
				type: userType,
				wallete: 10,
			});

			expect(result).toEqual({
				success: false,
				message: "wrong user type was choosen",
				data: { userType },
			});
		});
	});

	describe("validate method check", () => {
		test("return success for valid username", () => {
			const username = "nishat404";
			const createdUser = UserValidation.validateUserName(username);
			expect(createdUser).toEqual({
				success: true,
				message: "username is valid",
				data: { username: username },
			});
		});

		test("return error for invalidate username", () => {
			const username = "123nishat";
			const createdUser = UserValidation.validateUserName(username);
			expect(createdUser).toEqual({
				success: false,
				message:
					"username must only contains alphabets and optionally digits at the end. nothing else. please try again. example - nishat304",
				data: { username },
			});
		});

		test("return success for valid email", () => {
			const email = "nishat@gmail.com";
			const createdUser = UserValidation.validateEmail(email);
			expect(createdUser).toEqual({
				success: true,
				message: null,
				data: {
					email,
				},
			});
		});

		test("return error for invalid email", () => {
			const email = "nishatislam.com";
			const createdUser = UserValidation.validateEmail(email);
			expect(createdUser).toEqual({
				success: false,
				message: "Invalid email address",
				data: { email },
			});
		});

		test("return sucess for valid user type", () => {
			const userType = "organizer";
			const createdUser = UserValidation.validateType(userType);
			expect(createdUser).toEqual({
				success: true,
				message: "user type validation success",
				data: { userType },
			});
		});

		test("return error for invalid user type", () => {
			const userType = "invalidtype" as UsertypeType;
			const createdUser = UserValidation.validateType(userType);
			expect(createdUser).toEqual({
				success: false,
				message: "wrong user type was choosen",
				data: { userType },
			});
		});
	});
});

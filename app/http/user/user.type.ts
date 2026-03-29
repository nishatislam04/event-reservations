export type UserStatusType = "active" | "inactive" | "banned";
export type UsertypeType = "organizer" | "attendee" | "platform" | "guest";

export type UserCreateProps = {
	id: string;
	username: string;
	password: string;
	email: string;
	type: UsertypeType;
	wallet: number;
};
export type UserType = {
	id: string | null;
	username: string | null;
	password: string | null;
	email: string | null;
	type: UsertypeType;
	status: UserStatusType;
	wallet: number;
};
export type FullValidationDataUserCreate = {
	username: string;
	email: string;
	type: UsertypeType;
};

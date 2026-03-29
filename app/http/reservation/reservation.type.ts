import type { EventStatusType, EventType } from "../event/event.type";
import type { UserType } from "../user/user.type";

export type ReservationStatusType = "success" | "failed" | "active";

export type ReservationType = {
	_id: string | null;
	userId: string | null;
	eventId: string | null;
	expiresAt: number | null;
	status: ReservationStatusType;
	createdAt: Date | null;
};

export type ReservationCreateProps = {
	id: string | null;
	eventId: string | null;
	userId: string | null;
	expiresAt: number | null;
	user: UserType;
	event: EventType & { status: EventStatusType };
};

import { isAfter } from "date-fns";
import type { EventStatusType, EventType } from "../event/event.type";
import type { UserType } from "../user/user.type";
import type {
	ReservationCreateProps,
	ReservationStatusType,
} from "./reservation.type";

export class Reservation {
	_id: string | null = null;
	userId: string | null = null;
	eventId: string | null = null;
	expiresAt: number | null = null;
	status: ReservationStatusType = "active";
	createdAt: Date | null = null;

	get id() {
		if (this._id !== null) return this._id;
		return "reservation id is not set";
	}

	get() {
		return {
			id: this._id,
			userId: this.userId,
			eventId: this.eventId,
			expiredAt: this.expiresAt,
		};
	}

	create(
		props: ReservationCreateProps & {
			user: UserType;
			event: EventType & { status: EventStatusType };
		},
	) {
		// 1. make sure user and event exist
		if (!props.user) return "user is not found";
		if (!props.event) return "event is not found";

		// 2. event is published && validate event date
		if (props.event.status !== "published") return "event is not published";
		if (props.event.date === null) return "event date can not be null";
		if (!isAfter(new Date(props.event.date), new Date()))
			return "event date validation failed. event date is not after current date";

		// 3. user is attendee type
		if (props.user.type !== "attendee") return "user is not attendee";

		// 4. user did not reserve more than 5 for this event already
		// -> TODO: we cant check it because right now our reservation is not database like datasets. we will fix it later

		// 5. event inventory has enough tickets to reserve for
		if (Number(props.event.totalTickets) < 1)
			return "not enough ticket found to reserve for";

		// 6. assign 10 minutes on the reservation record
		this.expiresAt = 10;

		// 7. update event tickets info
		props.event.totalTickets = String(Number(props.event.totalTickets) - 1);

		// 8. when ticket count hit 0 update ticket status to sold_out
		if (Number(props.event.totalTickets) === 0)
			props.event.totalTickets = props.event.status = "sold_out";

		this._id = props.id;
		this.userId = props.userId;
		this.eventId = props.eventId;
		this.expiresAt = props.expiresAt;
		this.createdAt = new Date();
	}

	updateStatusType(type: ReservationStatusType) {
		this.status = type;
	}
}

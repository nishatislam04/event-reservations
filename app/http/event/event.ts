import type { UserType } from "../user/user.type";
import type { EventCreateProps, EventStatusType } from "./event.type";

export type ReservationTypes = {
	eventId: string;
	reservationId: string;
	userId: string;
};

export class Event {
	id: string | null = null;
	title: string | null = null;
	description: string | null = null;
	organizerIds: string[] | null = null;
	startDate: string | null = null;
	endDate: string | null = null;
	totalTickets: string | null = null;
	ticketPrice: string | null = null;
	category: string | null = null;
	status: EventStatusType = "draft";
	reservations: ReservationTypes[] = [];
	wallet: number = 0;
	createdAt: string | null = null;

	get() {
		return {
			id: this.id ?? "ID not found",
			title: this.title ?? "title not found",
			description: this.description ?? "description not found",
			organizerId: this.organizerIds ?? "organizerId not found",
			startDate: this.startDate ?? "event start date not found",
			endDate: this.endDate ?? "event end date was not found",
			category: this.category ?? "event category not found",
			status: this.status ?? "event status not found",
			ticketPrice: this.ticketPrice ?? "event ticket price not found",
			totalTickets: this.totalTickets ?? "event total tickets number not found",
			wallet: this.wallet ?? "event wallete not found",
		};
	}

	create(props: EventCreateProps & { user: UserType }) {
		// assign to field as a record creation
		this._id = props.id;
		this.title = props.title;
		this.organizerIds = [...props.organizerIds];
		this.startDate = props.startDate;
		this.endDate = props.endDate;
		this.totalTickets = props.totalTickets;
		this.ticketPrice = props.ticketPrice;
		this.category = props.category;

		// return event
		return {
			id: this.id,
			title: this.title,
			organizerIds: this.organizerIds,
			startDate: this.startDate,
			endDate: this.endDate,
			category: this.category,
			status: this.status,
		};
	}

	connectReservationWithEvent(props: ReservationTypes) {
		this.reservations.push(props);
	}

	updateStatus(status: EventStatusType): void {
		this.status = status;
	}
}

import type { ReservationTypes } from "./event";

export type EventStatusType =
	| "draft"
	| "published"
	| "sold_out"
	| "cancelled"
	| "completed";

export type EventCreateProps = {
	id: string;
	title: string;
	description: string;
	organizerIds: string;
	startDate: string;
	endDate: string;
	totalTickets: string;
	ticketPrice: string;
	category: string;
	createdAt: string;
};

export type EventType = {
	id: string | null;
	title: string | null;
	description: string | null;
	organizerIds: string | null;
	startDate: string | null;
	endDate: string | null;
	totalTickets: string | null;
	ticketPrice: string | null;
	category: string | null;
	status: EventStatusType;
	reservations: ReservationTypes[];
	wallete: number;
	createdAt: string | null;
};

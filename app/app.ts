import { Event } from "./http/event/event";
import type { EventStatusType, EventType } from "./http/event/event.type";
import { Reservation } from "./http/reservation/reservation";
import { Ticket } from "./http/ticket/ticket";
import { User } from "./http/user/user";

const organizer = new User();
organizer.create({
	id: "organizer-first",
	username: "organizerfirst303",
	email: "organizer-first@gmail.com",
	type: "organizer",
	wallete: 10_000,
});

const attendee = new User();
attendee.create({
	id: "attendee-first",
	username: "attendee-first",
	email: "attendee@email.com",
	type: "attendee",
	wallete: 5_000,
});

const event = new Event();
// pass down user instance on event so that we can valid user
event.create({
	id: "first-event",
	organizerId: organizer.id ?? "organizer id not found",
	date: new Date(2026, 4, 10).toISOString(),
	title: "first-event",
	ticketPrice: "10",
	totalTickets: "100",
	category: "entertainment",
	user: organizer,
});
event.id && event.updateStatus("published");

const reservation = new Reservation();
reservation.create({
	id: "first-reservation",
	eventId: event.id ?? "Event id not found",
	userId: organizer.id ?? "organizer id not found",
	expiresAt: 10,
	user: attendee,
	event: event as EventType & { status: EventStatusType },
});
const reservation2 = new Reservation();
reservation2.create({
	id: "second-reservation",
	eventId: event.id ?? "Event id not found",
	userId: organizer.id ?? "organizer id not found",
	expiresAt: 10,
	user: attendee,
	event: event as EventType & { status: EventStatusType },
});
event.connectReservationWithEvent({
	userId: attendee.id,
	eventId: event.id,
	reservationId: reservation.id,
});
event.connectReservationWithEvent({
	userId: attendee.id,
	eventId: event.id,
	reservationId: reservation2.id,
});
setTimeout(() => {
	const ticket = new Ticket();
	const t = ticket.create({
		id: "first-ticket",
		user: attendee,
		event: event,
		reservation: reservation,
		status: "inactive",
	});

	console.log("The Ticket: ", t);
}, 2000);

console.log(reservation);

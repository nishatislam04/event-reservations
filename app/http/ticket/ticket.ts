import { addMinutes } from "date-fns";
import { compareAsc } from "date-fns/fp";
import type { EventType } from "../event/event.type";
import type { ReservationType } from "../reservation/reservation.type";
import type { UserType } from "../user/user.type";

// ticket need status field
type TicketCreateProps = {
	id: string;
	user: UserType;
	event: EventType;
	reservation: ReservationType;
	status: "inactive" | "purchased" | "failed" | "used";
};

export class Ticket {
	create(props: TicketCreateProps) {
		console.log(props);

		// 1. user is not banned
		if (props.user.status === "banned") return "user is banned";

		// 2. user has enough wallete
		if (props.user.wallete < Number(props.event.ticketPrice))
			return "not enough wallete to buy ticket";

		// 3. reservation time is not expired
		const reservationTime = props.reservation.createdAt;
		if (reservationTime === null) return "reservation time can not be null";
		if (props.reservation.expiresAt === null)
			return "reservation expires time can not be null";
		const maxTime = addMinutes(
			new Date(reservationTime),
			props.reservation.expiresAt,
		);
		// i am still very confused at this logic
		if (!compareAsc(maxTime, new Date())) {
			// TODO: handle reservation revert
			return "ticket purchase time expired.";
		}

		// 4. event status is not cancelled or draft
		if (props.event.status === "cancelled" || props.event.status === "draft")
			return "event can not be cancelled or draft";

		// # SWITCH - PAYMENT STATUS
		const paymentStatus = true;

		// 5. payment proccessing. if success - update reservation
		if (paymentStatus) {
			// 1. update reservation status
			props.reservation.status = "success";
			// 2. user wallete deduction
			props.user.wallete = props.user.wallete - Number(props.event.ticketPrice);
			// 3. event wallete increment
			props.event.wallete =
				props.event.wallete + Number(props.event.ticketPrice);
			// 4. ticket create with success
			props.status = "purchased";
			return "ticket create success";
		}
		// 6. payment processing. if failed - update reservation, ticket status
		if (!paymentStatus) {
			// 1. reservation status failed
			props.reservation.status = "failed";
			// 2. ticket status failed
			props.status = "failed";
			// 3. event ticket counter reverted back
			if (props.event.totalTickets === null)
				return "event total ticket can not be null";
			props.event.totalTickets += 1;
			return "ticket create failed";
		}
	}
}

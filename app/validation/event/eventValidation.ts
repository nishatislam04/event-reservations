import { isAfter } from "date-fns";
import z from "zod";
import type { EventCreateProps } from "../../http/event/event.type";
import type { UserType, UsertypeType } from "../../http/user/user.type";

export class EventValidation {
	static validate(props: EventCreateProps & { user: UserType }) {
		const isUserOrganizer = EventValidation.isUserOrganizer(props.user.type);
		if (!isUserOrganizer?.success) return isUserOrganizer;

		const titleValidationResult = EventValidation.titleValidate(props?.title);
		if (!titleValidationResult.success) return titleValidationResult;

		// const dateValidationResult = EventValidation.dateValidate(props.date);
		// if (!dateValidationResult.success) return dateValidationResult;

		// const isAfterDateValidationResult = EventValidation.isAfterDateValidate(
		//   props.date,
		// );
		// if (!isAfterDateValidationResult.success)
		//   return isAfterDateValidationResult;

		if (Number(props.totalTickets) <= 1)
			return {
				success: false,
				message: "total tickets can not be less than 1",
				data: props.totalTickets,
			};

		if (Number(props.ticketPrice) <= 0)
			return {
				success: false,
				message: "ticket price can not be less than 0",
				data: props.ticketPrice,
			};
	}

	static isUserOrganizer(userType: UsertypeType) {
		const typeResult = userType === "organizer";
		if (!typeResult) {
			return {
				success: false,
				message:
					"user is not organizer. only organizer user can create a event",
				data: userType,
			};
		}
	}

	static titleValidate(title: string) {
		if (!title || title === null || title.trim().length === 0) {
			return {
				success: false,
				message: "event title validation failed. it can not empty",
				data: title,
			};
		}
		return {
			success: true,
			message: "event title success",
			data: title,
		};
	}

	static dateValidate(date: string) {
		const dateConversion = new Date(date);
		const validDate = z.date().safeParse(dateConversion);
		if (!date || date === null || !validDate.success) {
			return {
				success: false,
				message: "event date is invalid. please check the date agian",
				data: date,
			};
		}
		return {
			success: true,
			message: "event date success validation",
			data: date,
		};
	}

	static isAfterDateValidate(date: string) {
		const result = isAfter(new Date(date), new Date());
		if (!result)
			return {
				success: false,
				message: "event date need to be after current date",
				data: date,
			};

		return {
			success: true,
			message: "event date is after current date.",
			data: date,
		};
	}

	static test(hello: string) {
		if (hello) {
			console.log(hello);

			for (let i = 0; i < 10; i++) {
				console.log(i);
			}

			for (let i = 0; i < 210; i++) {
				console.log(i);
			}
		}
	}
}

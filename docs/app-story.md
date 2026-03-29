# Event Reservation

This Event Reservation application is about creating events and reservation system for attendee. upon success reservation pay, a usable ticket will be generated for that event. user can also refund for a purchased ticket. when event end, the event money will be distributed between organizer and platform. There is a Rating system so is there a Fraud detection. This is about event creation and ticket system management with proper money distribution

## Entities

### User

1. organizer - they create events and sell tickets
2. attendee - they reserve and purchase tickets
3. platform - maybe? they are needed in 2 cases. so i think i should also have a platform type user

### Event

1. title 
2. organizerId
3. date
4. totalTickets
5. ticketPrice
6. category
7. status
 	1. draft
	2. published
	3. sold_out
	4. cancelled
	5. completed

Event status start with `draft`. Event automatically `sold_out` if all tickets reserved or sold. Event complete after date pass.

### Ticket

ticket only generated when a reservation is successfully paid. if not paid, the reservation will be cancelled

1. ticketId
2. eventId
3. ownerId
4. status
	1. reserved
	2. purchased
	3. cancelled
	4. used
	
### Reservation

User first need to reserve and then purchase a ticket.

#### Reservation rules

1. user must not banned
2. event must be published
3. reservation can not exceed available tickets
4. one user can reserve max 5 tickets per event
5. reservation expire after 10 minute
6. expired reservation release tickets back to inventory

### Purchase 

when purchase success, 
1. ticket status `purchased`
2. reservation status `completed`

### Ticket usage

when a user used the ticket for an event, the ticket status `used`

ticket can be only used when:
1. ticket status `Purchased`
2. event date is current date
3. ticket not used before

### Refund rules

Refund is only allowed only if
1. event `cancelled`
2. user request refund 24 hour before event

By refunding:
1. ticket become `cancelled`
2. user wallet refunded
3. ticket inventory increased again

### Wallet 

organizer recive money after event complete and platform take `15%` comission

### Fraud

1. user cancelled more than 10 tickets in 30 days
2. they attempt to reserve tickets for a cancelled event

### Rate 

after a event complete, attendee can rate an event in range between 1 to 5
event rating
organization reputation

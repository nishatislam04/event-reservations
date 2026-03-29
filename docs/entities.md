# Entities 

1. user
- username,
- email,
- status,
- wallet,
- type
	- organizer
	- attendee
	- platform
	- guest

2. event
- title
- organizationId
- date
- totalTickets
- ticketPrice
- category

3. Reservation
- eventId
- userId
- expires_at
- status
	- active
	- success
	- failed

4. ticket
- reservation,
- event,
- user
- status
	- purchased
	- cancelled
	- used
	- inactive

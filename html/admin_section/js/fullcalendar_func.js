
       	/* initialize the external events
		-----------------------------------------------------------------*/
	
		$('#external-events div.external-event').each(function() {
			
			'use strict';
		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $.trim($(this).text()) // use the element's text as the event title
			};
			
			// store the Event Object in the DOM element so we can get to it later
			$(this).data('eventObject', eventObject);
			
			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
			
		});
	
	
		/* initialize the calendar
		-----------------------------------------------------------------*/
		
		$('#calendar').fullCalendar({
			eventClick: function (calEvent, jsEvent, view) {           
			    $('#calendar').fullCalendar('removeEvents', calEvent._id);
			},
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			events: [
				{
					id:'1',
					title: 'Appointment',
					start: '2020-04-20'
				},
				{
					id:'2',
					title: 'Appointment',
					start: '2020-05-01'
				},
				{
					id:'3',
					title: 'Chat',
					start: '2020-05-10'
				},
				{
					id:'4',
					title: 'Video Call',
					start: '2020-05-12'
				},
				{
					id:'5',
					title: 'Chat',
					start: '2020-05-20'
				},
				{
					id:'6',
					title: 'Appointment',
					start: '2020-05-25'
				},
				{
					id:'7',
					title: 'Chat',
					start: '2020-06-01'
				}
			],
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date) { // this function is called when something is dropped
			
				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');
				
				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);
				
				// assign it the date that was reported
				copiedEventObject.start = date;
				
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true, );
				
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}

				
				
			}
		});

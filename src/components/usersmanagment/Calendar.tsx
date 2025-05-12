import React, { useState, useEffect,useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';
import { useSideBar } from '../sidebar';

const FullCalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<{ id: string; title: string; date: string }[]>(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showEvent, setShowEvent] = useState(false);
  const [event, setEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { isOpen } = useSideBar();
  const calendarRef = useRef<FullCalendar | null>(null);  
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  function handleFalseClick() {
    setShowEvent(false);
    setEvent('');
  }
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setTimeout(() => {
        calendarApi.updateSize();
      }, 300); 
    }
  }, [isOpen]);
  
  function handleOpenDeleteClick(clickInfo: any) {
    setSelectedEventId(clickInfo.event.id);
    setDeleteEvent(true);
  }

  function closeEventClick() {
    setDeleteEvent(false);
  }

  function handleEventClick() {
    if (selectedEventId) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEventId));
      setDeleteEvent(false);
      setSelectedEventId(null);
    }
  }

  function handleEvent() {
    if (event.trim() !== '' && selectedDate) {
      const newEvent = {
        id: uuidv4(),
        title: event.trim(),
        date: selectedDate,
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setShowEvent(false);
      setEvent('');
    }
  }

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setShowEvent(true);
  };

  return (
    <>
      <style>{`
        /* Styling for Day Cells */
        .fc-daygrid-day {
          background-color: #f9f9f9;
          border-radius: 5px;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }

        /* Styling for Day Numbers */
        .fc-daygrid-day-number {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          transition: color 0.3s ease;
        }

        /* Hover effect for day cells */
        .fc-daygrid-day:hover {
          background-color: #e0f7fa;
          cursor: pointer;
        }

        /* Weekend Days (Saturday, Sunday) */
        .fc-day-fri .fc-daygrid-day-number,
        .fc-day-sat .fc-daygrid-day-number {
          color: #d32f2f;
        }

        /* Today's Day */
        .fc-day-today .fc-daygrid-day-number {
          color: #fff;
          background-color: #007bff;
          border-radius: 50%;
        }

        /* Dark Mode Styling */
        .dark .fc-daygrid-day {
          background-color: #161616;
          border: 1px solid #444;
        }

        .dark .fc-daygrid-day-number {
          color: #fff;
        }

        .dark .fc-daygrid-day:hover {
          background-color: #575757;
        }

        .dark .fc-day-sat .fc-daygrid-day-number,
        .dark .fc-day-fri .fc-daygrid-day-number {
          color: #f44336;
        }

        .dark .fc-day-today .fc-daygrid-day-number {
          color: #fff;
          background-color: #009688;
        }

        /* Custom Styling for the toolbar and title */
        .dark .fc-toolbar-title {
          font-size: 28px;
          color: #fff;
        }
      `}</style>

      <div style={{ marginLeft: isOpen ? '240px' : '0', transition: '0.5s ease all' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventClick={handleOpenDeleteClick}
          events={events}
          ref={calendarRef}
        />

        {showEvent && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <form className="p-3 bg-light rounded-4 shadow-sm border">
              <div className="mb-3">
                <label htmlFor="eventInput" className="form-label fw-semibold text-dark">Add Event</label>
                <input
                  id="eventInput"
                  className="form-control"
                  type="text"
                  placeholder="Event name"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between gap-2">
                <button type="button" className="btn btn-success w-50" onClick={handleEvent}>
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-50"
                  onClick={handleFalseClick}
                >
                  No
                </button>
              </div>
            </form>
          </div>
        )}

        {deleteEvent && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="bg-light p-5 rounded-4 shadow-sm">
              <h4 className='text-dark'>Are you sure you want to delete this event?</h4>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <button type="button" className="btn btn-danger w-50" onClick={handleEventClick}>
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-50"
                  onClick={closeEventClick}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FullCalendarComponent;

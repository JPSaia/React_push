import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  const openModal = (slotInfo) => {
    setIsModalOpen(true);
    setNewEvent({
      start: slotInfo.start,
      end: slotInfo.end,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({});
  };

  const handleEventSave = () => {
    if (newEvent.start && newEvent.end && newEvent.title) {
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
    setNewEvent({});
  };

  return (
    <div className="CalendarComponent">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="day"
        views={['day', 'week']}
        step={60}
        showMultiDayTimes
        onSelectSlot={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event"
        ariaHideApp={false}
      >
        <h2>Add Workout</h2>
        <input
          type="text"
          value={newEvent.title || ''}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <button onClick={handleEventSave}>Save</button>
      </Modal>
    </div>
  );
};

export default CalendarComponent;

import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import pl from 'date-fns/locale/pl';
import en from 'date-fns/locale/en-US';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';

const locales = {
  'pl': pl,
  'en': en
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function Events() {
  const { events } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    type: '',
    calendarView: true
  });

  const filteredEvents = events
    .filter(event => {
      return (
        (!filters.date || event.date === filters.date) &&
        (!filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.type || event.type === filters.type)
      );
    })
    .map(event => ({
      ...event,
      start: new Date(event.date),
      end: new Date(new Date(event.date).setHours(23, 59, 59)),
      title: event.title
    }));

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">{t('events.title')}</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-2 font-medium">{t('events.filters.date')}</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('events.filters.location')}</label>
          <input
            type="text"
            placeholder={t('events.filters.locationPlaceholder')}
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">{t('events.filters.type')}</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('events.filters.all')}</option>
            <option value="festival">{t('events.types.festival')}</option>
            <option value="tasting">{t('events.types.tasting')}</option>
            <option value="harvest">{t('events.types.harvest')}</option>
            <option value="workshop">{t('events.types.workshop')}</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setFilters({...filters, calendarView: !filters.calendarView})}
            className="w-full px-4 py-2 bg-wine-500 text-white rounded hover:bg-wine-600"
          >
            {filters.calendarView ? t('events.listView') : t('events.calendarView')}
          </button>
        </div>
      </div>

      {filters.calendarView ? (
        <div className="h-[800px]">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            view={view}
            date={date}
            onView={handleViewChange}
            onNavigate={handleNavigate}
            messages={{
              today: t('calendar.today'),
              previous: t('calendar.previous'),
              next: t('calendar.next'),
              month: t('calendar.month'),
              week: t('calendar.week'),
              day: t('calendar.day'),
              agenda: t('calendar.agenda'),
              date: t('calendar.date'),
              time: t('calendar.time'),
              event: t('calendar.event'),
              noEventsInRange: t('calendar.noEvents')
            }}
            culture={i18n.language}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(event.date).toLocaleDateString()} | {event.location}
          </p>
          <p className="text-gray-700 dark:text-gray-200">{event.description}</p>
          {event.price && (
            <p className="font-semibold">{t('events.price')}: {event.price} PLN</p>
          )}
        </div>
        <div className="flex gap-2">
          {event.website && (
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {t('events.moreInfo')}
            </a>
          )}
          <button
            onClick={() => handleSetNotification(event.id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {t('events.setReminder')}
          </button>
        </div>
      </div>
    </div>
  );
}

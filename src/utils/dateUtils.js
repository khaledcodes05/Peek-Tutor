/**
 * Date and time helper utilities for Peer Tutor Booking Board
 */

/**
 * Returns formatted ISO date YYYY-MM-DD for N days from today
 */
export function getFutureDateString(daysAhead = 1) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns readable date format: "Thursday, Oct 29, 2026"
 */
export function formatReadableDate(dateString) {
  if (!dateString) return '';
  // Support both YYYY-MM-DD and Date objects
  const [year, month, day] = dateString.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Returns relative day label: "Today", "Tomorrow", or "Friday, Oct 30"
 */
export function getRelativeDayLabel(dateString) {
  if (!dateString) return '';
  const today = new Date();
  const todayStr = getFutureDateString(0);
  const tomorrowStr = getFutureDateString(1);

  if (dateString === todayStr) return 'Today';
  if (dateString === tomorrowStr) return 'Tomorrow';

  const [year, month, day] = dateString.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Parses "02:30 PM" to minutes from midnight for sorting/comparison
 */
export function timeStringToMinutes(timeStr) {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let [_, hours, mins, period] = match;
  hours = parseInt(hours, 10);
  mins = parseInt(mins, 10);
  if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
}

/**
 * Checks if a date & time is in the past relative to now
 */
export function isSlotInPast(dateString, timeString) {
  if (!dateString || !timeString) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  const minutes = timeStringToMinutes(timeString);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const slotDateTime = new Date(year, month - 1, day, hours, mins);
  const now = new Date();
  return slotDateTime < now;
}

/**
 * Generates an .ics calendar file content for export
 */
export function generateIcsContent({ title, description, location, dateString, timeString, durationMinutes = 60 }) {
  const [year, month, day] = dateString.split('-').map(Number);
  const startMinutes = timeStringToMinutes(timeString);
  const endMinutes = startMinutes + durationMinutes;

  const startHour = Math.floor(startMinutes / 60);
  const startMin = startMinutes % 60;
  const endHour = Math.floor(endMinutes / 60);
  const endMin = endMinutes % 60;

  const pad = (n) => String(n).padStart(2, '0');
  const dtStart = `${year}${pad(month)}${pad(day)}T${pad(startHour)}${pad(startMin)}00`;
  const dtEnd = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(endMin)}00`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Peer Tutor Booking Board//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}


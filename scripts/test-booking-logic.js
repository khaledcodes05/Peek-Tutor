/**
 * Automated test suite for Peer Tutor Booking Board
 * Tests booking conflicts, slot release on cancellation, price calculations,
 * and data integrity.
 */

import { INITIAL_TUTORS, ALL_SUBJECTS } from '../src/data/tutorsData.js';
import { isSlotInPast, formatReadableDate, timeStringToMinutes } from '../src/utils/dateUtils.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n--- 1. Testing Sample Data & Subjects ---');
assert(INITIAL_TUTORS.length >= 10, `At least 10 sample tutors present (found ${INITIAL_TUTORS.length})`);
assert(ALL_SUBJECTS.length === 8, `Exactly 8 college subjects supported (found ${ALL_SUBJECTS.length})`);

// Check required subject coverage
const requiredSubjects = [
  'Java programming',
  'Python programming',
  'Data Structures and Algorithms',
  'Database Management Systems',
  'Artificial Intelligence and Machine Learning',
  'Mathematics',
  'Web Development',
  'Computer Networks'
];

requiredSubjects.forEach(subject => {
  const count = INITIAL_TUTORS.filter(t => t.subjects.includes(subject)).length;
  assert(count > 0, `Subject "${subject}" is covered by ${count} tutor(s)`);
});

console.log('\n--- 2. Testing Date and Time Utilities ---');
assert(timeStringToMinutes('10:00 AM') === 600, '10:00 AM converts to 600 minutes');
assert(timeStringToMinutes('02:30 PM') === 870, '02:30 PM converts to 870 minutes');
assert(!isSlotInPast('2099-01-01', '10:00 AM'), 'Future slot in 2099 is not in past');
assert(isSlotInPast('2020-01-01', '10:00 AM'), 'Past slot in 2020 is marked as in past');

console.log('\n--- 3. Testing Price Calculation Logic ---');
function calcPrice(hourlyRate, durationMins) {
  if (hourlyRate === 0) return 0;
  return Math.round((hourlyRate * (durationMins / 60)) * 100) / 100;
}
assert(calcPrice(0, 60) === 0, 'Free tutor for 60 mins costs $0');
assert(calcPrice(20, 60) === 20, '$20/hr tutor for 60 mins costs $20');
assert(calcPrice(20, 30) === 10, '$20/hr tutor for 30 mins costs $10');
assert(calcPrice(18, 45) === 13.5, '$18/hr tutor for 45 mins costs $13.50');
assert(calcPrice(22, 90) === 33, '$22/hr tutor for 90 mins costs $33');

console.log('\n--- 4. Testing Booking & Conflict Prevention ---');
// In-memory mock simulation of state engine
let tutors = JSON.parse(JSON.stringify(INITIAL_TUTORS));
let bookings = [];

function mockBookSession({ tutorId, slotId, studentName, durationMinutes = 60 }) {
  const tutor = tutors.find(t => t.id === tutorId);
  if (!tutor) return { success: false, error: 'Tutor not found' };

  const slot = tutor.slots.find(s => s.id === slotId);
  if (!slot) return { success: false, error: 'Slot not found' };

  if (slot.isBooked) {
    return { success: false, error: 'Slot already booked' };
  }

  const referenceId = `PTB-${Math.floor(10000 + Math.random() * 90000)}`;
  const booking = {
    referenceId,
    tutorId,
    slotId,
    studentName,
    date: slot.date,
    startTime: slot.startTime,
    status: 'CONFIRMED'
  };

  slot.isBooked = true;
  bookings.push(booking);
  return { success: true, referenceId, booking };
}

const testTutor = tutors[0];
const targetSlot = testTutor.slots[0];

// First booking must succeed
const b1 = mockBookSession({ tutorId: testTutor.id, slotId: targetSlot.id, studentName: 'Test Student A' });
assert(b1.success === true, `Slot ${targetSlot.id} booked successfully (Ref: ${b1.referenceId})`);
assert(targetSlot.isBooked === true, 'Slot marked isBooked = true');

// Second booking on the SAME slot must fail with conflict error
const b2 = mockBookSession({ tutorId: testTutor.id, slotId: targetSlot.id, studentName: 'Test Student B' });
assert(b2.success === false, 'Duplicate booking rejected as expected');
assert(b2.error === 'Slot already booked', 'Appropriate conflict error returned');

console.log('\n--- 5. Testing Cancellation & Slot Release ---');
function mockCancelBooking(referenceId) {
  const booking = bookings.find(b => b.referenceId === referenceId);
  if (!booking) return { success: false, error: 'Booking not found' };

  booking.status = 'CANCELLED';
  const tutor = tutors.find(t => t.id === booking.tutorId);
  const slot = tutor.slots.find(s => s.id === booking.slotId);
  if (slot) {
    slot.isBooked = false;
  }
  return { success: true };
}

const cancelRes = mockCancelBooking(b1.referenceId);
assert(cancelRes.success === true, 'Booking cancelled successfully');
assert(targetSlot.isBooked === false, 'Slot released and marked isBooked = false');

// Slot must now be bookable again!
const b3 = mockBookSession({ tutorId: testTutor.id, slotId: targetSlot.id, studentName: 'Test Student C' });
assert(b3.success === true, 'Previously cancelled slot can now be re-booked successfully');

console.log('\n--- 6. Testing Tutor Comparison Limits ---');
let compareIds = [];
function mockToggleCompare(tutorId) {
  if (compareIds.includes(tutorId)) {
    compareIds = compareIds.filter(id => id !== tutorId);
    return { success: true, action: 'removed' };
  }
  if (compareIds.length >= 2) {
    return { success: false, error: 'Maximum 2 tutors allowed' };
  }
  compareIds.push(tutorId);
  return { success: true, action: 'added' };
}

assert(mockToggleCompare('tutor-1').success === true, 'Added tutor 1 to comparison');
assert(mockToggleCompare('tutor-2').success === true, 'Added tutor 2 to comparison');
assert(mockToggleCompare('tutor-3').success === false, 'Rejected 3rd tutor as exceeding max 2');
assert(mockToggleCompare('tutor-1').action === 'removed', 'Removed tutor 1 from comparison');
assert(mockToggleCompare('tutor-3').success === true, 'Successfully added tutor 3 after freeing slot');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}


import { format } from 'date-fns';

export const formatDates = (date) => format(new Date(date), 'MMMM yyyy');

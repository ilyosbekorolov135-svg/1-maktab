// Uzbek date and number formatting utilities

export const UZBEK_MONTHS: Record<number, string> = {
  0: 'Yanvar',
  1: 'Fevral',
  2: 'Mart',
  3: 'Aprel',
  4: 'May',
  5: 'Iyun',
  6: 'Iyul',
  7: 'Avgust',
  8: 'Sentabr',
  9: 'Oktabr',
  10: 'Noyabr',
  11: 'Dekabr'
};

export const formatUzbekDate = (dateInput?: string | Date | number): string => {
  if (!dateInput) return 'Hozirgina';
  
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      // If it's already a clean string like "2026", return it
      return String(dateInput);
    }
    const day = d.getDate();
    const month = UZBEK_MONTHS[d.getMonth()] || '';
    const year = d.getFullYear();
    return `${day}-${month}, ${year}`;
  } catch {
    return String(dateInput);
  }
};

export const formatUzbekDateFull = (dateInput?: string | Date | number): string => {
  if (!dateInput) return '2026-yil';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = d.getDate();
    const month = UZBEK_MONTHS[d.getMonth()] || '';
    const year = d.getFullYear();
    return `${year}-yil, ${day}-${month.toLowerCase()}`;
  } catch {
    return String(dateInput);
  }
};

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
  
  return `${ordinalDay} ${month} ${year} - ${hours}:${minutes}`;
}


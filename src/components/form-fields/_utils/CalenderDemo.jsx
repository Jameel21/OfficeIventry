import React from 'react';
import { Calendar } from '@/components/ui/calendar';
const CalenderDemo = () => {
  return (
    <div>
      <Calendar captionLayout="dropdown-button"
      fromMonth={1985}
      toMonth={2024}/>
    </div>
  );
}

export default CalenderDemo;

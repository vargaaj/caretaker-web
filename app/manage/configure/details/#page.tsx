"use client"
import { useSearchParams } from 'next/navigation';

export default function Details() {
  const searchParams = useSearchParams();
  const timeframe = searchParams.get('timeframe')
  const classroomNumber = searchParams.get('classroomNumber')

  if ((!timeframe) && (!classroomNumber)) {
    // Handle the case where data is not available (e.g., direct access)
    return <p>No data received from previous page.</p>;
  }

  // Utilize the savedData (e.g., display values)
  return (
    <div>
      Timeframe: {timeframe}
      <br />
      Classroom Number: {classroomNumber}
    </div>
  );
}


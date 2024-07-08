// add console log at the bottom to track the unassigned kids
// just to get an idea if the logic is working correctly
// there is definitely still something wrong with the logic
// adds kids to the class even if it is full

export interface ClassroomDetails {
  size: number;
  ageRange: string;
  classroomName: string;
}

export interface UploadData {
  Dob: number;
  Room: string;
  LastName: string;
  FirstName: string;
  TimeSchedule: string;
  ageInMonths?: number;
}

// Get current month index and ordered months array
// const currentMonthIndex = new Date().getMonth();
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

export function classCreation(
  originalUploadData: UploadData[],
  classRoomDetails: ClassroomDetails[]
): { [month: string]: UploadData[] } {
  function excelSerialDateToJSDate(serial: number): Date {
    const excelEpoch = new Date(Date.UTC(1900, 0, 1));
    const jsDate = new Date(
      excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000
    );
    return jsDate;
  }

  // Function to calculate age in months
  function calculateAge(serialDob: number, monthsToAdd: number): number {
    const birthDate = excelSerialDateToJSDate(serialDob);
    const today = new Date();
    const ageInMonths =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth()) +
      monthsToAdd;
    return ageInMonths;
  }

  // Clone the original uploadData to work with
  const uploadData = [...originalUploadData];

  // Function to assign children to classrooms for a given month
  function assignClassrooms(
    children: UploadData[],
    monthIndex: number,
    classrooms: ClassroomDetails[] // Pass in the classrooms array
  ): UploadData[] {
    // Calculate age for each child and sort by age in months
    const childrenWithAge = children.map((child) => ({
      ...child,
      ageInMonths: calculateAge(child.Dob, monthIndex), // Adjust age for current month
    }));

    const childrenSortedByAge = childrenWithAge.sort(
      (a, b) => a.ageInMonths! - b.ageInMonths!
    );

    // For the current month, maintain original Room assignment
    if (monthIndex === 0) {
      return childrenSortedByAge.map((child) => ({
        ...child,
        Room: child.Room || "Unassigned", // Default to "Unassigned" if Room is not assigned
      }));
    }

    // For future months, assign based on age range and class size
    return childrenSortedByAge.map((child) => {
      // Check if child is already assigned to a room and still qualifies
      if (child.Room) {
        const currentClassDetail = classrooms.find(
          (classDetail) => classDetail.classroomName === child.Room
        );

        if (currentClassDetail) {
          const [minAge, maxAge] = currentClassDetail.ageRange
            .split("-")
            .map(Number);

          // Check if child's age still falls within current class age range
          if (child.ageInMonths! >= minAge && child.ageInMonths! <= maxAge) {
            return { ...child };
          }
        }
      }

      // Find a suitable classroom if child needs reassignment
      let assigned = false;
      for (let j = 0; j < classrooms.length; j++) {
        const classDetail = classrooms[j];
        const [minAge, maxAge] = classDetail.ageRange.split("-").map(Number);

        // Check if the child's age falls within the class age range
        if (child.ageInMonths! >= minAge && child.ageInMonths! <= maxAge) {
          // Check if there is available space in the classroom
          let classSize = classDetail.size; // Access size from classDetail
          if (classSize > 0) {
            // Assign child to this classroom
            child.Room = classDetail.classroomName;
            classSize -= 1; // Reduce the available size of the classroom
            assigned = true;
            break; // Exit the loop once assigned
          }
        }
      }

      // If no suitable classroom was found, consider it unassigned or handle as needed
      if (!assigned) {
        child.Room = "Unassigned"; // Or some default value indicating no assignment
      }

      return { ...child };
    });
  }

  // Map to store the results for each month
  const yearlyClassAssignments: { [month: string]: UploadData[] } = {};

  // Iterate through 12 months starting from the current month
  const currentMonthIndex = new Date().getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonthIndex + i) % 12; // Use modulus to wrap around months array
    const childrenAssigned = assignClassrooms(uploadData, i, [
      ...classRoomDetails,
    ]); // Pass a shallow copy of classRoomDetails
    yearlyClassAssignments[months[monthIndex]] = [...childrenAssigned];
  }

  console.log(yearlyClassAssignments);
  return yearlyClassAssignments;
}

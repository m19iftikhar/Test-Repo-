export const convertToDateTime = (time: any) => {
  const date = new Date(); // Example dateString: '2024-10-21T00:00:00Z'

  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);

  // Format the date to desired format
  return date; // Converts to format like: 'Mon Oct 21 2024 08:00:00 GMT+0500 (Pakistan Standard Time)'
};

export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.log("error", error);
      return reject(error);
    };
  });
};

export const extractDoctorName = (data) => {
  const names = data.map((item) => item.doctorName);
  let concatenatedNames = "";

  names.forEach((name, index) => {
    concatenatedNames += `${index + 1}. ${name}\n`;
  });

  return concatenatedNames;
};

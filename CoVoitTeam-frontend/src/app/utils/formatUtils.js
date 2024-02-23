function formatBirthdateReadable(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); // Ajoute un zéro devant si nécessaire
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ajoute un zéro devant si nécessaire
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const convertDate = (inputFormat) => {
  const parts = inputFormat.split("/");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const convertLongDate = (inputFormat) => {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const parts = inputFormat.split("-");
  const day = parseInt(parts[2]);
  const month = months[parseInt(parts[1], 10) - 1];
  return `${day} ${month}`;
};


const convertVeryLongDate = (inputDate) => {
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};


export default formatBirthdateReadable;
export { convertVeryLongDate,convertLongDate, convertDate, formatBirthdateReadable };

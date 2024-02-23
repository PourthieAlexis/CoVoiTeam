import * as Yup from "yup";

/**
 * @typedef {Object} AccountUserYup
 *
 * @author Laurence Delporte
 */

const fields = {
    startingPoint: Yup.string().required('Requis'),
    endingPoint: Yup.string().required('Requis'),
    selectedDate: Yup.date()
      .required('La date est requise')
      .min(new Date(), 'La date ne peut pas être antérieure à aujourd\'hui'),
};

export const schemaSearchbarTrip = Yup.object().shape({
    startingPoint: fields.startingPoint,
    endingPoint: fields.endingPoint,
    selectedDate: fields.selectedDate,
});
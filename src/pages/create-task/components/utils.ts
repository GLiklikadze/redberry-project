export const getClassName = (
  errors: string,
  fieldName: string,
  isDirty: boolean,
  type: string,
) => {
  let className = "";

  if (errors === type) {
    className += "text-red-custom";
  }
  if (fieldName && errors !== type && isDirty) {
    className += "text-green-custom";
  }

  return className;
};

import React from 'react';

export const useFormFields = (initialState) => {
  const [fields, setFields] = React.useState(initialState);

  return [
    fields,
    function (event) {
      setFields({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
};

// based on Griddle's default sort -- which is not very great out-of-the-box
export const sortMethod = (data, column, sortAscending = true) => data.sort(
  (original, newRecord) => {
    original = ((!!original.get(column) && original.get(column)) || "").toUpperCase();
    newRecord = ((!!newRecord.get(column) && newRecord.get(column)) || "").toUpperCase();

    //TODO: This is about the most cheezy sorting check ever.
    //Make it better
    if(original === newRecord) {
      return 0;
    } else if (original > newRecord) {
      return sortAscending ? 1 : -1;
    }
    else {
      return sortAscending ? -1 : 1;
    }
  })

  // location sort
export const locationSortMethod = (data, column, sortAscending = true) => data.sort(
  (original, newRecord) => {
    const getLocationValue = (record) => (
      `${record.get('country')}${record.get('stateProvince')}${record.get('city')}`.toUpperCase()
    );

    original = getLocationValue(original);
    newRecord = getLocationValue(newRecord);

    //TODO: This is about the most cheezy sorting check ever.
    //Make it better
    if(original === newRecord) {
      return 0;
    } else if (original > newRecord) {
      return sortAscending ? 1 : -1;
    }
    else {
      return sortAscending ? -1 : 1;
    }
  })

// Industry sort
export const indusrySortMethod = (data, column, sortAscending = true) => data.sort(
    (original, newRecord) => {
        original = ((!!original.get(column) && original.get(column)) || "").toUpperCase();
        newRecord = ((!!newRecord.get(column) && newRecord.get(column)) || "").toUpperCase();

        //TODO: This is about the most cheezy sorting check ever.
        //Make it better
        if (original === newRecord) {
            return 0;
        } else if (original > newRecord) {
            return sortAscending ? 1 : -1;
        }
        else {
            return sortAscending ? -1 : 1;
        }
})

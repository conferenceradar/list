const UpdatePlugin = {
  reducer: {
    GRIDDLE_UPDATE_STATE_AFTER: (state, action) => {
      return (state
        .setIn(['pageProperties', 'currentPage'], 1)
        .setIn(['currentPosition', 'yScrollChangePosition'], 0)
      );
    }
  },
}

export default UpdatePlugin;
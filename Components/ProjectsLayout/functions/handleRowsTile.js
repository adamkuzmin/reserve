/* алгоритм разбивает карточки на ряды */
/*const handleRowsTile = ({ needsRandom = false }) => {
  let stepKey = 0;
  if (needsRandom) stepKey = Math.round((Math.random() * 16) % 3);

  let rowType;
  let sequence;

  switch (stepKey) {
    case 0:
      {
        sequence = sequence1;
        rowType = rowType1;
      }
      break;
    case 1:
      {
        sequence = sequence2;
        rowType = rowType2;
      }
      break;
    case 2:
      {
        sequence = sequence3;
        rowType = rowType3;
      }
      break;
    default:
      {
        sequence = sequence1;
        rowType = rowType1;
      }
      break;
  }

  const sumOfCycle = [...sequence].reduce((prev, curr) => prev + curr);
  const cyclesAmount = Math.ceil(stateData.length / sumOfCycle);

  let copiedData = [...stateData];
  let components = [];*/

  /* дробим на порции для row компонентов */
  /*for (let i = 0; i < cyclesAmount; i++) {
    for (let b = 0; b < sequence.length; b++) {
      const part = copiedData.splice(0, sequence[b]);

      if (part.length > 0) {
        switch (rowType[b]) {
          case "A":
            components.push(<RowA {...{ data: part }} />);
            break;
          case "B":
            components.push(<RowB {...{ data: part }} />);
            break;
          case "C":
            components.push(<RowC {...{ data: part }} />);
            break;
          case "D":
            components.push(<RowD {...{ data: part }} />);
            break;
        }
      }
    }
  }

  return components;
};

export { handleRowsTile };*/

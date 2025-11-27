export function generateSelect(select?: string[], exclude?: string[]) {
  //NEEDS TO BE FIXED BECAUSE INCLUSION AND EXCLUSION PROJECTION CAN'T HAPPEN AT THE SAME TIME
  const fields: Record<string, number> = {}
  if (select) {
    select.reduce((prev, cur) => {
      prev[cur] = 1;
      return prev;
    }, fields)
  }
  if (exclude) {
    exclude.reduce((prev, cur) => {
      prev[cur] = 0;
      return prev;
    }, fields)
  }
  return fields;
}
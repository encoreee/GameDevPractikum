export const removeAttrFromObject = <O extends object, K extends keyof O>(
  object: O,
  attr: K
): Omit<O, K> => {
  const newObject = { ...object };

  if (attr in newObject) {
    delete newObject[attr];
  }

  return newObject;
};

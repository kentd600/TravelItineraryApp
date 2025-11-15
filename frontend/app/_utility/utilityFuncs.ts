type classNames = string[]

export function classNames(...args: classNames) {
  if (args.length === 1) return args[0];
  return args.join(" ");
}
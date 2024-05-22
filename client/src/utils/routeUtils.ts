export const getRoute = (path: string, ...parameters: any[]): string => {
  return parameters?.length
    ? parameters.reduce((p, parameter) => p.replace(/:[^/]*/, parameter), path)
    : path;
};

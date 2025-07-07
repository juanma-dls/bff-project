export const parsePath = (uriPath: string, pathParams: any) => {
  const params = Object.keys(pathParams);
  params.forEach((param) => {
    uriPath = uriPath.replace(`{${param}}`, pathParams[param]);
  });
  return uriPath;
}
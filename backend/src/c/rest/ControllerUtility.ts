export interface ControllerResult<T> {
  success: boolean,
  error: Error | null,
  data: T | null
}

export function controllerResult<T>(data: T | null, success: boolean = true, error: null | Error = null): ControllerResult<T> {
  return {
    data,
    success,
    error
  }
}
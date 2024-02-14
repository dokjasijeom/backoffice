import type { UseFetchOptions } from "#app";
import { defu } from "defu";

export function useApi<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const userAuth = useCookie("DS_AUT");
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseApiURL ?? "http://localhost:8080",
    headers: userAuth.value
      ? { Authorization: `Bearer ${userAuth.value}` }
      : {},

    onResponse(_ctx) {
      //
    },
    onResponseError(_ctx) {
      //
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}

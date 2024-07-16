import type { $Fetch } from 'ofetch';
import { withTrailingSlash } from 'ufo';
import { appendResponseHeader, splitCookiesString } from 'h3';
import { useCurrentUserStore } from '@tituskirch/app-base/stores/currentUser';

const SECURE_METHODS = new Set(['post', 'delete', 'put', 'patch']);
const COOKIE_OPTIONS: { readonly: true } = { readonly: true };

export function createHttpClient(): $Fetch {
  const nuxtApp = useNuxtApp();
  const event = useRequestEvent(nuxtApp);

  /**
   * Basic headers for the API
   *
   * @param headers
   * @param setDefaultContentType
   * @returns {HeadersInit}
   */
  function buildHeaders({
    headers,
    setDefaultContentType,
  }: {
    headers: HeadersInit;
    setDefaultContentType?: boolean;
  }): HeadersInit {
    let result: HeadersInit = {
      Accept: 'application/json',
    };

    if (setDefaultContentType !== false) {
      result = {
        ...result,
        'Content-Type': 'application/json',
      };
    }

    return {
      ...result,
      ...headers,
    };
  }

  /**
   * Pass all cookies, headers and referrer from the client to the API
   *
   * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/141017985113ee70e51f5949f08bcbcfc83c39f9/src/runtime/httpFactory.ts#L69-L84
   * @param headers Headers collection to extend
   * @returns {HeadersInit}
   */
  function buildServerHeaders({ headers }: { headers: HeadersInit }): HeadersInit {
    const clientCookies = useRequestHeaders(['cookie']);
    const origin = useRequestURL().origin;

    return {
      ...headers,
      Referer: origin,
      Origin: origin,
      ...(clientCookies.cookie && clientCookies),
    };
  }

  /**
   * Request a new CSRF cookie from the API
   *
   * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/141017985113ee70e51f5949f08bcbcfc83c39f9/src/runtime/httpFactory.ts#L26C1-L37C6
   * @returns {Promise<void>}
   */
  async function initCsrfCookie(): Promise<void> {
    await $fetch('sanctum/csrf-cookie', {
      baseURL: runtimeConfig.public.apiUrl,
      credentials: 'include',
    });

    console.debug('CSRF cookie has been initialized');
  }

  /**
   * Add CSRF token to the headers collection to pass from the client to the API
   *
   * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/141017985113ee70e51f5949f08bcbcfc83c39f9/src/runtime/httpFactory.ts#L39C1-L67C6
   * @param headers Headers collection to extend
   * @returns {Promise<HeadersInit>}
   */
  async function useCsrfHeader(headers: HeadersInit): Promise<HeadersInit> {
    let csrfToken = useCookie('XSRF-TOKEN', COOKIE_OPTIONS);

    if (!csrfToken.value) {
      await initCsrfCookie();

      csrfToken = useCookie('XSRF-TOKEN', COOKIE_OPTIONS);
    }

    if (!csrfToken.value) {
      console.warn('XSRF-TOKEN cookie is missing, unable to set X-XSRF-TOKEN header');

      return headers as HeadersInit;
    }

    console.debug('Added X-XSRF-TOKEN header to pass to the API');

    return {
      ...headers,
      ...(csrfToken.value && { ['X-XSRF-TOKEN']: csrfToken.value }),
    };
  }

  const runtimeConfig = useRuntimeConfig();
  // const { session } = useUserSession()
  return $fetch.create({
    baseURL: withTrailingSlash(runtimeConfig.public.apiUrl),

    async onRequest({ options }) {
      const method = options.method?.toLowerCase() ?? 'get';
      const opts: typeof options & {
        version?: string;
        setCsrfToken?: boolean;
        setDefaultContentType?: boolean;
      } = options || {};

      opts.credentials = 'include';
      opts.headers = buildHeaders({
        headers: opts.headers || {},
        setDefaultContentType: opts.setDefaultContentType,
      });
      if (opts?.version) {
        opts.baseURL = withTrailingSlash(opts.baseURL + opts.version);
      }

      if (import.meta.server) {
        opts.headers = buildServerHeaders({ headers: opts.headers });
      }

      if (SECURE_METHODS.has(method)) {
        opts.headers = await useCsrfHeader(opts.headers);
      }

      // if (session.value?.token) {
      //   if (Array.isArray(headers)) {
      //     headers.push(['Authorization', `Bearer ${session.value?.token}`])
      //   } else if (headers instanceof Headers) {
      //     headers.set('Authorization', `Bearer ${session.value?.token}`)
      //   } else {
      //     headers.Authorization = `Bearer ${session.value?.token}`
      //   }
      // }

      // set options
      options = opts;
    },

    /**
     * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/141017985113ee70e51f5949f08bcbcfc83c39f9/src/runtime/httpFactory.ts#L115-L148
     */
    async onResponse({ request, response }): Promise<void> {
      // check if nuxt app is available
      if (!import.meta.server && !import.meta.client) {
        console.error('Nuxt app is not available');
        return;
      }

      // pass all cookies from the API to the client on SSR response
      if (import.meta.server) {
        const serverCookieName = 'set-cookie';
        const cookieHeader = response.headers.get(serverCookieName);

        if (cookieHeader === null || event === undefined) {
          console.debug(`No cookies to pass to the client [${request}]`);

          return;
        }

        const cookies = splitCookiesString(cookieHeader);
        const cookieNameList = [];

        for (const cookie of cookies) {
          appendResponseHeader(event, serverCookieName, cookie);

          const cookieName = cookie.split('=')[0];
          cookieNameList.push(cookieName);
        }

        console.debug(`Append API cookies from SSR to CSR response [${cookieNameList.join(', ')}]`);
      }

      // follow redirects on client
      if (response.redirected) {
        await nuxtApp.runWithContext(() => navigateTo(response.url));
      }

      // function to recursively convert attributes with _at suffix to Date
      const convertAttributesToDate = (obj: Record<string, unknown>) => {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'object' && value !== null) {
            convertAttributesToDate(value as Record<string, unknown>);
          } else if (typeof key === 'string' && key.endsWith('_at')) {
            obj[key] = new Date(value as string);
          }
        }
      };

      // // function to recursively convert snake_case keys to camelCase
      // const convertSnakeCaseToCamelCase = (obj: Record<string, unknown>) => {
      //   for (const [key, value] of Object.entries(obj)) {
      //     if (typeof value === 'object' && value !== null) {
      //       convertSnakeCaseToCamelCase(value as Record<string, unknown>);
      //     }

      //     const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      //     if (key !== camelCaseKey) {
      //       obj[camelCaseKey] = value;
      //       delete obj[key];
      //     }
      //   }
      // };

      // check if response._data exists before processing
      if (response._data) {
        // convert attributes with _at suffix to Date
        convertAttributesToDate(response._data);

        // // convert snake_case keys to camelCase
        // convertSnakeCaseToCamelCase(response._data);
      }
    },

    /**
     * @see https://github.com/manchenkoff/nuxt-auth-sanctum/blob/141017985113ee70e51f5949f08bcbcfc83c39f9/src/runtime/httpFactory.ts#L150-L169
     */
    async onResponseError({ response }) {
      const currentUserStore = useCurrentUserStore();

      if (response.status === 419) {
        console.warn('CSRF token mismatch, check your API configuration');

        return;
      }

      if (
        response.status === 401 &&
        // request.toString().endsWith('/users/me') &&
        currentUserStore.user !== null
      ) {
        console.warn('User session is not set in API or expired, resetting identity');
        currentUserStore.reset();
      }
    },
  }) as $Fetch;
}


export enum Scope {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum Layout {
  AUTH = 'auth',
  MAIN = 'main',
  ADDITIONAL_AUTH_INFO = 'additional-auth-info',
  NONE = 'none',
}

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  scope: Scope;
  layout: Layout;
  redirect?: string;
  regex?: RegExp | string;
}

export type RouteProps = {
  [key: string | symbol | number]: Route;
};

export const routes: RouteProps = {
  auth: {
    name: 'auth',
    path: '/auth',
    exact: false,
    regex: /\/auth(\?|\/\?)(.+)$/g,
    scope: Scope.PUBLIC,
    layout: Layout.AUTH,
  },
  onboarding: {
    path: '/onboarding',
    name: 'onboarding',
    exact: true,
    scope: Scope.PRIVATE,
    layout: Layout.AUTH,
  },
  verify: {
    name: 'verify',
    path: '/verify',
    exact: false,
    regex: /\/verify\?.+/g,
    scope: Scope.PUBLIC,
    layout: Layout.AUTH,
  },
  notFound: {
    name: 'sign-in',
    path: '/not-found',
    exact: true,
    scope: Scope.PUBLIC,
    layout: Layout.NONE,
  },
  home: {
    name: 'home',
    path: '/',
    exact: true,
    scope: Scope.PRIVATE,
    layout: Layout.MAIN,
  },
  dashboard: {
    name: 'dashboard',
    path: '/dashboard',
    exact: true,
    scope: Scope.PRIVATE,
    layout: Layout.MAIN,
  },
  team: {
    name: 'team',
    path: '/team',
    exact: true,
    scope: Scope.PRIVATE,
    layout: Layout.MAIN,
  },
  // signUpEmployee: {
  //   name: 'sign-up',
  //   path: '/signup',
  //   exact: true,
  //   scope: Scope.PUBLIC,
  //   layout: Layout.AUTH,
  // },
};

export const checkPath = (path?: string) => {
  const route = Object.values(routes).find((item) => {
    if (item.path === path || (!item.exact && item.regex && !!path?.match(item.regex))) {
      return item;
    }

    return undefined;
  });

  if (!route) {
    return {
      route, isValid: false, found: false,
    };
  }

  return {
    route, isValid: !!route, found: true,
  };
};

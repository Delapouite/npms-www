import { markAsLoading, unmarkAsLoading } from 'shared/state/app/actions';
import store from 'shared/state/store';
import homeRoute from './home';
import searchRoute from './search';

export default [
    // The following routes are part of the main build
    {
        indexRoute: true,
        ...homeRoute,
    },
    // The following routes are part of the main build
    {
        path: '/search',
        ...searchRoute,
    },
    // The rest of the routes are lazy loaded
    {
        path: '/about',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                setTimeout(() => store.dispatch(unmarkAsLoading()), 50);
                callback(null, require('./about').default.component);
            }, 'about');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./about').default.component), 'about');
        },
    },
    {
        path: '/privacy',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                setTimeout(() => store.dispatch(unmarkAsLoading()), 50);
                callback(null, require('./privacy').default.component);
            }, 'privacy');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./privacy').default.component), 'privacy');
        },
    },
    {
        path: '/terms',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                setTimeout(() => store.dispatch(unmarkAsLoading()), 50);
                callback(null, require('./terms').default.component);
            }, 'terms');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./terms').default.component), 'terms');
        },
    },
    {
        path: '/*',
        getComponent(location, callback) {
            store.dispatch(markAsLoading());
            require.ensure([], (require) => {
                setTimeout(() => store.dispatch(unmarkAsLoading()), 50);
                callback(null, require('./not-found').default.component);
            }, 'not-found');
        },
        getChildRoutes(location, callback) {
            require.ensure([], (require) => callback(null, require('./not-found').default.component), 'not-found');
        },
    },
];
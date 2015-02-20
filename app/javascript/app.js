(function () {
    'use strict';


    angular.module('app', ['ngNewRouter', 'app.home', 'app.user'])

        .controller('AppController', ['$router', function ($router) {

            /**
             * ngNewRouter provides the new $router service
             */


            /**
             * Setting up routes
             * The configuration maps routes to components[1] for each view port.
             */
            $router.config([
                { path: '/',            redirectTo: '/home' /*[1]*/ },
                { path: '/home',        component: 'home'      /*[1]*/ },
                { path: '/user/:id',    component: 'user' /*[1]*/ }
            ]);
        }]);



        /**
         * [1]: Components
         * In Angular 1.x a "routable component" is formed by:
         *      - A Template
         *      - A Controller
         *      - A Router
         *
         *      The router tells the component what to put inside the view ports based on URL.
         */

}());
(function () {
    'use strict';

    angular.module('app.user', [])
        .controller('UserController', ['$routeParams', '$q', '$timeout', UserController]);

        function UserController($routeParams, $q, $timeout) {
            this.$timeout = $timeout;
            this.$q = $q;

            this.id = $routeParams.id;
            this.actions = {};
        }


        //Hooks listed in execution order

        /**
         * Before switching to a new component, this hook runs for each active component in the app. If any of them return false, a rejected promise, or a promise that resolves to false, the navigation is cancelled.
         * This hook is useful for authentication.
         * @returns {boolean}
         */
        UserController.prototype.canActivate = function () {
            console.log('canActivate hook');

            //authenticating
            return Number(this.id) === 10;
        };

        //here deactivate hook of previous component would fire

        /**
         * This hook fires just before the navigation finishes.
         * This hook is useful for cases where you want your component to do some intensive work.
         * @returns {boolean}
         */
        UserController.prototype.activate = function () {
            console.log('activate hook');

            //we got this from an api call
            return this.name = "John Doe";
        };


        /**
         * This hook fires for each component that is removed as part of navigation.
         * canDeactivate fires before any new components are instantiated.
         * If any of them return false, a rejected promise, or a promise that resolves to false, the navigation is cancelled.
         * This hook is useful for making sure that data is properly persisted before navigating away.
         * @returns {boolean}
         */
        UserController.prototype.canDeactivate = function () {
            console.log('canDeactivate hook');
            var deferred = this.$q.defer();

            this.actions = angular.extend(this.actions || {}, {
                confirm: true,
                save: function () {
                    deferred.resolve(true); //must resolve to a truthy value
                },
                reject: function () {
                    this.confirm = false;
                    deferred.reject();
                }
            });

            return deferred.promise;
        };


        /**
         * This hook fires for each component that is removed as part of navigation.
         * This hook fires after the canActivate of the new component and canDeactivate of the component to be removed, but before activate of the new component.
         * deactivate hook is useful for doing cleanup work.
         */
        UserController.prototype.deactivate = function () {
            //do some cleanup
        };


        /**
         *   Execution order
         *   var oldController (we are navigating away from this controller)
         *   var newController (we are navigating towards this controller)
         *
         *   Start navigation
         *     -> oldController.canDeactivate() -> true  ->
         *     -> newController.canActivate()   -> true  ->
         *     -> oldController.deactivate()    ->
         *     -> newController.activate()
         *   End navigation
         */

}());
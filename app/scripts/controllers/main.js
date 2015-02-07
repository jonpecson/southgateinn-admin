'use strict';

/**
 * @ngdoc function
 * @name adminHotelReservationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adminHotelReservationApp
 */
angular.module('adminHotelReservationApp')
    .controller('MainCtrl', function($rootScope, $firebase, Firebase, $scope, $firebaseAuth, Enum, $filter, uiCalendarConfig) {
        var FBUrl = "https://south-gate-inn.firebaseio.com/bookings/";
        var FBRef = new Firebase(FBUrl);

        //firebase auth
        $scope.authObj = $firebaseAuth(FBRef);

        var sync = $firebase(FBRef);
        var bookingsArray = sync.$asArray();

        $scope.$on('$viewContentLoaded', function() {
            $scope.approvedBookings = [];
            $scope.pendingBookings = [];

            bookingsArray.$loaded().then(function(bookings) {
                var approved = $filter('filter')(bookings, 'Approved');
                var pending = $filter('filter')(bookings, 'Pending');

                for (var i = 0; i < approved.length; i++) {
                    $scope.approvedBookings.push({
                        id: 9,
                        title: approved[i].roomtype + ' (' + approved[i].firstname + ' ' + approved[i].lastname + ')',
                        start: new Date(Date.parse(approved[i].arrival)),
                        end: new Date(Date.parse(approved[i].departure)),
                        allDay: true
                    })
                }

                for (var i = 0; i < pending.length; i++) {
                    $scope.pendingBookings.push({
                        title: pending[i].roomtype + ' (' + pending[i].firstname + ' ' + pending[i].lastname + ')',
                        start: pending[i].arrival,
                        end: pending[i].departure
                    })
                }
            });
        });
        $scope.login = function() {
            $scope.authObj.$authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function(authData) {
                console.log("Logged in as:", authData.uid);
                $scope.dismiss();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
                $scope.error = error;
            });
        }

        /* Change View */
        $scope.changeView = function(view, calendar) {
            // uiCalendarConfig.calendar[calendar].fullCalendar('changeView',view);
            $scope.myBookingCalendar.fullCalendar('changeView', view);
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: false,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                }
            }
        };

        $scope.eventSources = [$scope.approvedBookings];

        // var getEnumName = function(key) {
        //     var result = $filter('filter')(Enum.SomeEnums, key);
        //     console.log(result[0]);
        //     return result[0];
        // };
        // var enumIWant = getEnumName(1);
        // console.log(enumIWant.name);


    });

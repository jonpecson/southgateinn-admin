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

        // Used to store list of booking schedules
        $scope.bookingScheds = []

        angular.element(document).ready(function() {
            bookingsArray.$loaded().then(function(bookings) {
                var books = $filter('filter')(bookings, 'Approved');

                for (var i = 0; i < books.length; i++) {
                    $scope.bookingScheds.push({
                        id: 9,
                        title: books[i].roomtype + '( ' + books[i].firstname + ' ' + books[i].lastname + ' )',
                        start: new Date(Date.parse(books[i].arrival)),
                        end: new Date(Date.parse(books[i].departure)),
                        allDay: true
                    })
                }
                console.log($scope.bookingScheds);
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
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                }
            }
        };

        $scope.eventSources = [$scope.bookingScheds];

        // var getEnumName = function(key) {
        //     var result = $filter('filter')(Enum.SomeEnums, key);
        //     console.log(result[0]);
        //     return result[0];
        // };
        // var enumIWant = getEnumName(1);
        // console.log(enumIWant.name);


    });

'use strict';

/**
 * @ngdoc function
 * @name adminHotelReservationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the adminHotelReservationApp
 */
angular.module('adminHotelReservationApp')
  .controller('ReservationCtrl', function ($scope, $firebase, Firebase) {
    var URL = "https://south-gate-inn.firebaseio.com/bookings/";
        var ref = new Firebase(URL);
        // create an AngularFire reference to the data
        var sync = $firebase(ref);
        // download the data into a (psuedo read-only), sorted array
        // all server changes are applied in realtime
        var bookingsArray = sync.$asArray();
        // place the list into $scope for use in the DOM
        $scope.bookings = bookingsArray;

        $scope.changeStatus = function(b,status) {
            // var key = $scope.bookings.$indexFor(b);
            // var booking = $scope.bookings.$getRecord(key)
            b.status = status;
            $scope.bookings.$save(b);
        }
  });

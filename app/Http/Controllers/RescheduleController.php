<?php

namespace App\Http\Controllers;

use App\Reschedule;
use Illuminate\Http\Request;

class RescheduleController extends Controller
{
    public function get_reschedule(Request $request)
    {
        $reschedule_success = Reschedule::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Success')->count('status');
        $reschedule_pending = Reschedule::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Pending')->count('status');
        $reschedule_failed = Reschedule::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Failed')->count('status');
        $reschedule_expired = Reschedule::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Expired')->count('status');
        // $booking = Booking::paginate(5);

        return response()->json([
            'reschedule_success' => $reschedule_success,
            'reschedule_pending' => $reschedule_pending,
            'reschedule_failed' => $reschedule_failed,
            'reschedule_expired' => $reschedule_expired,
        ]);
    }
}

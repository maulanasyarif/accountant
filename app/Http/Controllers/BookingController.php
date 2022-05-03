<?php

namespace App\Http\Controllers;

use App\Booking;
use App\Cancellation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Session;

class BookingController extends Controller
{
    public function index()
    {
        return view('__page.booking.index');
    }

    public function order(Request $request, $id)
    {
        return view('__page.booking.order', [
            'id' => $id,
            'pickup' => isset($request->pickup) ? $request->pickup : "null",
            'drop' => isset($request->drop) ? $request->drop : "null",
            'departure' => isset($request->departure) ? $request->departure : "null",
            'arrival' => isset($request->arrival) ? $request->arrival : "null"
        ]);
    }

    public function get_booking(Request $request)
    {
        $auth = Session::get('admin-auth.user');

        for ($i = 0; $i <= 12; $i++) {
            $booking[$i] = Booking::whereMonth('booking_date', "$i")
                ->whereYear('booking_date', $request->year)
                ->where('company_id', '=', $auth->company[0]->id)
                ->count();

            $cancel[$i] = Cancellation::with(['companies'])->whereMonth('date', "$i")
                ->whereYear('date', $request->year)
                ->where('status', 'Success')
                ->whereHas('companies', function (Builder $builder) use ($auth) {
                    $builder->where('company_id', '=', $auth->company[0]->id);
                })
                ->count();
        }

        return response()->json([
            'booking' => $booking,
            'cancel' => $cancel
        ]);
    }
}

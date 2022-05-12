<?php

namespace App\Http\Controllers;

use App\Cancellation;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function index()
    {
        return view('__page/refund/index');
    }

    public function detail($id)
    {
        return view('__page/refund/detail', ['id' => $id]);
    }

    public function cancellation()
    {
        return view('__page/refund/cancellation');
    }

    public function new($id)
    {
        return view('__page/refund/new', ['id' => $id]);
    }

    public function get_refund(Request $request)
    {
        $refund_success = Cancellation::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Success')->count('status');
        $refund_pending = Cancellation::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Pending')->count('status');
        $refund_failed = Cancellation::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Failed')->count('status');
        $refund_expired = Cancellation::whereMonth('date', $request->month)->whereYear('date', $request->year)->where('status', 'Expired')->count('status');

        return response()->json([
            'refund_success' => $refund_success,
            'refund_pending' => $refund_pending,
            'refund_failed' => $refund_failed,
            'refund_expired' => $refund_expired,
        ]);
    }
}

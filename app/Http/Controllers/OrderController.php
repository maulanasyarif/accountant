<?php

namespace App\Http\Controllers;

use App\Order;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use Session;

class OrderController extends Controller
{
    public function index()
    {
        return view('__page.order.index');
    }

    public function detail($id)
    {
        return view('__page.order.direct_detail', ['id' => $id]);
    }

    // public function get_order(Request $request)
    // {
    //     $auth = Session::get('admin-auth.user');

    //     $order_success = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->where('status', 'Success')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->count('status');

    //     $order_pending = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->where('status', 'Pending')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->count('status');

    //     $order_failed = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->where('status', 'Failed')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->count('status');

    //     $order_expired = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->where('status', 'Expired')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->count('status');

    //     return response()->json([
    //         'order_success' => $order_success,
    //         'order_pending' => $order_pending,
    //         'order_failed' => $order_failed,
    //         'order_expired' => $order_expired,
    //     ]);
    // }

    // public function get_income(Request $request)
    // {
    //     $auth = Session::get('admin-auth.user');

    //     $week1 = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->whereDay('date', '>=', '01')
    //         ->whereDay('date', '<=', '07')
    //         ->where('status', 'Success')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->sum('total_price');

    //     $week2 = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->whereDay('date', '>=', '08')
    //         ->whereDay('date', '<=', '15')
    //         ->where('status', 'Success')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->where('status', '=', 'Success')
    //         ->sum('total_price');

    //     $week3 = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->whereDay('date', '>=', '16')
    //         ->whereDay('date', '<=', '22')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->where('status', 'Success')
    //         ->sum('total_price');

    //     $week4 = Order::whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->whereDay('date', '>=', '23')
    //         ->whereDay('date', '<=', '31')
    //         ->whereHas('companies', function (Builder $builder) use ($auth) {
    //             $builder->where('id', '=', $auth->company[0]->id);
    //         })
    //         ->where('status', 'Success')
    //         ->sum('total_price');

    //     return response()->json([
    //         'week1' => $week1,
    //         'week2' => $week2,
    //         'week3' => $week3,
    //         'week4' => $week4,
    //     ]);
    // }

    // public function get_favorit(Request $request)
    // {
    //     $auth = Session::get('admin-auth.user');

    //     $tujuan_favorit = DB::table('orders')->select('city_name', DB::raw('count(*) as total'))
    //         ->whereMonth('date', $request->month)
    //         ->whereYear('date', $request->year)
    //         ->join('order_providers', 'order_providers.order_id', '=', 'orders.id')
    //         ->join('companies', 'companies.id', '=', 'order_providers.company_id')
    //         ->where('companies.id', '=', $auth->company[0]->id)
    //         ->join('cities', 'cities.id', '=', 'orders.arrival_city')
    //         ->groupBy('arrival_city')
    //         ->orderBy('total', 'desc')
    //         ->limit(5)
    //         ->get();

    //     return response()->json([
    //         'results' => $tujuan_favorit,
    //     ]);
    // }
}
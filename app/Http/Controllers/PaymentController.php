<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function available($id)
    {
        return view('__page.payment.available', ['id' => $id]);
    }

    public function cash($id)
    {
        return view('__page.payment.cash', ['id' => $id]);
    }

    public function card($id)
    {
        return view('__page.payment.card', ['id' => $id]);
    }
}

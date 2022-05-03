<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function skema()
    {
        return view('__page/report/skema');
    }


    public function pemesanan()
    {
        return view('__page/report/pemesanan');
    }


    public function agent()
    {
        return view('__page/report/agent');
    }
}

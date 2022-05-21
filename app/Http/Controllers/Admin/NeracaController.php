<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NeracaController extends Controller
{
    public function neraca()
    {
        return view('__page.admin.laporan.neraca');
    }

    public function saldo()
    {
        return view('__page.admin.laporan.saldo');
    }

    public function labaRugi()
    {
        return view('__page.admin.laporan.labaRugi');
    }
}
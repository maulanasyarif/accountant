<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KasCoorporateController extends Controller
{

    public function index()
    {
        return view('__page.admin.kas.index');
    }
}

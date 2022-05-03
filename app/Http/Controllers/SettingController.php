<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function profile(Request $request)
    {
        // dd($request->session()->get('admin-auth'));
        return view('__page/profile');
    }
}

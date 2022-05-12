<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CabangController extends Controller
{
    public function index()
    {
        return view('__page.admin.cabang.index');
    }

    public function detail($id)
    {
        return view('__page.admin.cabang.detail', ['id' => $id]);
    }
}
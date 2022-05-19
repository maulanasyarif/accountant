<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KasController extends Controller
{
    public function index()
    {
        return view('__page.admin.kas.index');
    }

    public function edit($id)
    {
        return view('__page.admin.kas.edit', ['id' => $id]);
    }
}
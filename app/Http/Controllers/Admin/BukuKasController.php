<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BukuKasController extends Controller
{
    public function index()
    {
        return view('__page.admin.bukuKas.index');
    }

    public function edit($id)
    {
        return view('__page.admin.bukuKas.edit', ['id' => $id]);
    }
}
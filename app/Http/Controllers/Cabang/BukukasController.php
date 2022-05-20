<?php

namespace App\Http\Controllers\Cabang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BukukasController extends Controller
{
    public function index()
    {
        return view('__page.cabang.bukukas.index');
    }

    public function edit($id)
    {
        return view('__page.cabang.bukuKas.edit', ['id' => $id]);
    }
}
<?php

namespace App\Http\Controllers\Cabang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KasController extends Controller
{
    public function index()
    {
        return view('__page.cabang.kas.index');
    }

    public function edit($id)
    {
        return view('__page.cabang.kas.edit', ['id' => $id]);
    }
}
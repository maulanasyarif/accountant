<?php

namespace App\Http\Controllers\Cabang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DaftarPerkiraanController extends Controller
{
    public function index()
    {
        return view('__page.cabang.daftarPerkiraan.index');
    }

    public function add()
    {
        return view('__page.cabang.daftarPerkiraan.add');
    }
    
    public function edit($id)
    {
        return view('__page.cabang.daftarPerkiraan.edit', ['id' => $id]);
    }
}
<?php

namespace App\Http\Controllers\Cabang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PerkiraanController extends Controller
{
    public function index()
    {
        return view('__page.cabang.perkiraan.index');
    }

    public function add()
    {
        return view('__page.cabang.perkiraan.add');
    }
    
    public function edit($id)
    {
        return view('__page.cabang.daftarPerkiraan.edit', ['id' => $id]);
    }
}
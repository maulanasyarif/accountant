<?php

namespace App\Http\Controllers\Cabang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    
    public function index()
    {
        return view('__page.cabang.kegiatan.index');
    }

    public function add()
    {
        return view('__page.cabang.kegiatan.add');
    }
    
    public function edit($id)
    {
        return view('__page.cabang.kegiatan.edit', ['id' => $id]);
    }
}
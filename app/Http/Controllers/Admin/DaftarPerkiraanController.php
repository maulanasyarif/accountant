<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DaftarPerkiraanController extends Controller
{
    public function index()
    {
        return view('__page.admin.daftarPerkiraan.index');
    }

    // public function add()
    // {
    //     return view('__page.admin.daftarPerkiraan.add');
    // }
    
    public function edit($id)
    {
        return view('__page.admin.daftarPerkiraan.edit', ['id' => $id]);
    }
}
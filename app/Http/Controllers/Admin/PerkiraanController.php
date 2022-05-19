<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PerkiraanController extends Controller
{
    public function index()
    {
        return view('__page.admin.perkiraan.index');
    }

    // public function add()
    // {
    //     return view('__page.admin.perkiraan.add');
    // }
    
    public function edit($id)
    {
        return view('__page.admin.perkiraan.edit', ['id' => $id]);
    }
}
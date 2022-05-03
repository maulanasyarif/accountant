<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CorporateController extends Controller
{
    public function index()
    {
        return view('__page.master.corporate.index');
    }

    public function add()
    {
        return view('__page.master.corporate.add');
    }
    
    public function edit($id)
    {
        return view('__page.master.corporate.edit', ['id' => $id]);
    }
}
<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PengajuanController extends Controller
{
    public function index()
    {
        return view('__page.master.pengajuan.index');
    }

    public function detail($id)
    {
        return view('__page.master.pengajuan.detail', ['id' => $id]);
    }
}
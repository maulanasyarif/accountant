<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    public function pengajuan()
    {
        return view('__page.admin.kegiatan.pengajuan');
    }

    public function edit($id)
    {
        return view('__page.admin.kegiatan.editPengajuan', ['id' => $id]);
    }
}
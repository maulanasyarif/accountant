<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return view('__page.admin.inventory.index');
    }

    public function edit($id)
    {
        return view('__page.admin.inventory.edit', ['id' => $id]);
    }

    public function transaksi()
    {
        return view('__page.admin.inventory.transaksi');
    }
    public function editTransaksi($id)
    {
        return view('__page.admin.inventory.editTransaksi', ['id' => $id]);
    }
}
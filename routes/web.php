<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group([
    'middleware' => ['no.auth']
], function () {
    Route::post('/authenticate', 'AuthController@authenticate')->name('authenticate');
});

Route::group([
    'middleware' => ['api.auth'],
], function () {
    Route::get('/logout', 'AuthController@logout')->name('logout');
    Route::post('/update_session', 'AuthController@update_session');
    Route::get('/delete_session', 'AuthController@delete_session');
    Route::get('/notification', 'NotificationController@index')->name('notif');
});

Route::group([
    'middleware' => ['no.auth', 'setlocale']
], function () {
    Route::get('/', 'AuthController@index')->name('home');
    Route::get('/login', 'AuthController@index')->name('login');
});

Route::group([
    'middleware' => ['api.auth', 'setlocale'],
], function () {
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
    Route::get('/profile', 'SettingController@profile')->name('profile');

    //MASTER
    Route::get('Corporate', 'Master\CorporateController@index')->name('Corporate');
    Route::get('addCorporate', 'Master\CorporateController@add')->name('addCorporate');
    Route::get('editCorporate/{id}', 'Master\CorporateController@edit')->name('detailCorporate');

    Route::get('Account', 'Master\AccountController@index')->name('Account');

    Route::get('pengajuan', 'Master\PengajuanController@index')->name('pengajuan');
    Route::get('detailPengajuan/{id}', 'Master\PengajuanController@detail')->name('detailPengajuan');
    
    Route::get('activityLog', 'Master\ActivityController@index')->name('activityLog');
    

    //ADMIN/CORPORATE
    Route::get('perkiraanAdmin', 'Admin\PerkiraanController@index')->name('perkiraanAdmin');
    Route::get('editperkiraanAdmin/{id}', 'Admin\PerkiraanController@edit')->name('editperkiraanAdmin');

    Route::get('daftarPerkiraanAdmin', 'Admin\DaftarPerkiraanController@index')->name('daftarPerkiraanAdmin');
    Route::get('addDaftarPerkiraanAdmin', 'Admin\DaftarPerkiraanController@add')->name('addDaftarPerkiraanAdmin');
    Route::get('editaftarPerkiraanAdmin/{id}', 'Admin\DaftarPerkiraanController@edit')->name('editaftarPerkiraanAdmin');
    
    Route::get('jurnalUmumAdmin', 'Admin\KasController@index')->name('jurnalUmumAdmin');
    Route::get('editjurnalUmumAdmin/{id}', 'Admin\KasController@edit')->name('editjurnalUmumAdmin');
    
    Route::get('bukuKasAdmin', 'Admin\BukuKasController@index')->name('bukuKasAdmin');
    Route::get('editBukuKasAdmin/{id}', 'Admin\BukuKasController@edit')->name('editBukuKasAdmin');
    
    Route::get('cabang', 'Admin\CabangController@index')->name('cabang');
    Route::get('addCabang', 'Admin\CabangController@add')->name('addCabang');
    Route::get('cabang/{id}', 'Admin\CabangController@detail')->name('detailCabang');

    Route::get('pengajuanAdmin', 'Admin\KegiatanController@pengajuan')->name('pengajuanAdmin');
    Route::get('editPengajuanAdmin/{id}', 'Admin\KegiatanController@edit')->name('editPengajuanAdmin');

    Route::get('jurnalUmumCoorporate', 'Admin\KasCoorporateController@index')->name('jurnalUmumCoorporate');

    Route::get('inventoryAdmin', 'Admin\InventoryController@index');
    Route::get('editInventoryAdmin/{id}', 'Admin\InventoryController@edit');

    Route::get('transaksiInventory', 'Admin\InventoryController@transaksi');
    Route::get('editTransaksiInventory/{id}', 'Admin\InventoryController@editTransaksi');
    
    Route::get('neraca', 'Admin\NeracaController@neraca');
    Route::get('saldo', 'Admin\NeracaController@saldo');
    Route::get('labaRugi', 'Admin\NeracaController@labaRugi');
    
    
    //CABANG
    Route::get('perkiraanCabang', 'Cabang\PerkiraanController@index')->name('perkiraanCabang');
    Route::get('addperkiraanCabang', 'Cabang\PerkiraanController@add')->name('addperkiraanCabang');
    Route::get('editperkiraanCabang/{id}', 'Cabang\PerkiraanController@edit')->name('editperkiraanCabang');

    Route::get('daftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@index')->name('daftarPerkiraanCabang');
    // Route::get('addDaftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@add')->name('addDaftarPerkiraanCabang');
    Route::get('editaftarPerkiraanCabang/{id}', 'Cabang\DaftarPerkiraanController@edit')->name('editaftarPerkiraanCabang');
    
    Route::get('kegiatanCabang', 'Cabang\KegiatanController@index')->name('kegiatanCabang');
    Route::get('addKegiatanCabang', 'Cabang\KegiatanController@add')->name('addKegiatanCabang');
    Route::get('printKegiatanCabang/{id}', 'Cabang\KegiatanController@print')->name('printKegiatanCabang');
    // Route::get('addDaftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@add')->name('addDaftarPerkiraanCabang');
    
    Route::get('jurnalUmumCabang', 'Cabang\KasController@index')->name('jurnalUmumCabang');
    Route::get('editjurnalUmumCabang/{id}', 'Cabang\KasController@edit')->name('editjurnalUmumCabang');
    
    Route::get('inventoryCabang', 'Cabang\InventoryController@index')->name('inventoryCabang');
    
    Route::get('pengajuanCabang', 'Cabang\KegiatanController@pengajuan')->name('pengajuanCabang');

    // Route::get('jurnalUmumCabang', 'Cabang\KasController@index')->name('jurnalUmumCabang');
    Route::get('bukuKas', 'Cabang\BukukasController@index')->name('bukuKas');
    Route::get('editBukuKasCabang/{id}', 'Cabang\BukuKasController@edit')->name('editBukuKasCabang');


    // Route::get('pengajuanCabang', 'Cabang\KegiatanController@pengajuan')->name('pengajuanCabang');
});
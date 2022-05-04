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

    //CABANG
    Route::get('perkiraanCabang', 'Cabang\PerkiraanController@index')->name('perkiraanCabang');
    Route::get('addperkiraanCabang', 'Cabang\PerkiraanController@add')->name('addperkiraanCabang');

    Route::get('daftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@index')->name('daftarPerkiraanCabang');
    Route::get('addDaftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@add')->name('addDaftarPerkiraanCabang');

    Route::get('kegiatanCabang', 'Cabang\KegiatanController@index')->name('kegiatanCabang');
    Route::get('addKegiatanCabang', 'Cabang\KegiatanController@add')->name('addKegiatanCabang');
    Route::get('printKegiatanCabang/{id}', 'Cabang\KegiatanController@print')->name('printKegiatanCabang');
    // Route::get('addDaftarPerkiraanCabang', 'Cabang\DaftarPerkiraanController@add')->name('addDaftarPerkiraanCabang');


    //MASTER
    Route::get('Corporate', 'Master\CorporateController@index')->name('Corporate');

    Route::get('Account', 'Master\AccountController@index')->name('Account');
});

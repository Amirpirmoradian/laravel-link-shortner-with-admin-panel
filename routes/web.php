<?php

use App\Http\Controllers\Auth\LoginController;
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

Route::redirect('/', '/admin', 301);

Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/', function(){
        return view('admin.index');
    });
});
Auth::routes();

//set get method for logout
Route::get('logout', [LoginController::class, 'logout'])->name('logout');